from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess
import tempfile
from langchain_google_genai import ChatGoogleGenerativeAI
import markdown2

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Load the Google API key from environment variables
google_api_key ='AIzaSyAkq2vvoBwK6PNR9FSFS-c5rC_ydXb5Jn0'  # Set this in your environment variables
llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", google_api_key=google_api_key)

@app.route('/generate_question', methods=['POST'])
def generate_question():
    data = request.json
    topic = data.get('topic')
    difficulty_level = data.get('difficulty')
    question = generate_dsa_question(topic, difficulty_level)
    return jsonify({
        'question': question
    })

def generate_dsa_question(topic, difficulty_level):
    prompt = f"Generate a C++ DSA coding question on {topic} for {difficulty_level} level, do not include the solution."
    result = llm.invoke(prompt)
    return result.content.strip()  # Ensure no extra whitespace

@app.route('/evaluate_code', methods=['POST'])
def evaluate_code():
    data = request.json
    user_code = data.get('code')
    question = data.get('question')

    if not user_code or not question:
        return jsonify({'error': 'Code or question not provided.'}), 400

    evaluation_result = evaluate_user_code(user_code, question)
    return jsonify({'evaluation': evaluation_result})

def evaluate_user_code(user_code, question):
    prompt = (
        f"Evaluate the following C++ code for the question '{question}'. "
        f"Determine if it is correct or not, "
        f"and if the code is incorrect, please provide the corrected C++ code and explain the logic behind it. "
        f"Also, mention the time complexity of both the original and corrected C++ codes:\n\n{user_code}"
    )
    result = llm.invoke(prompt)
    return markdown2.markdown(result.content.strip()).replace('<p>', '').replace('</p>', '').strip()  # Remove HTML tags

@app.route('/generate_dsa_question_solution', methods=['POST'])
def generate_dsa_question_solution():
    data = request.json
    question = data.get('question')
    solution = generate_dsa_questions_solution(question)
    return jsonify({
        'solution': solution
    })

def generate_dsa_questions_solution(question):
    prompt = f"Generate only correct code for this question: '{question}', in C++. Do not include any HTML tags or formatting."
    result = llm.invoke(prompt)
    return result.content.strip()  # Ensure the solution is clean of whitespace

@app.route('/run_code', methods=['POST'])
def run_code():
    data = request.json
    user_code = data.get('code', '')

    if not user_code.strip():
        return jsonify({'output': 'No code provided. Please write some code to execute.'})

    # Create a temporary directory to store the code and compiled files
    with tempfile.TemporaryDirectory() as temp_dir:
        cpp_file_path = os.path.join(temp_dir, 'user_code.cpp')

        try:
            # Write user code to a .cpp file
            with open(cpp_file_path, 'w') as cpp_file:
                cpp_file.write(user_code)

            # Compile the C++ code using g++
            compile_process = subprocess.run(['g++', cpp_file_path, '-o', os.path.join(temp_dir, 'user_code')],
                                              capture_output=True, text=True)

            if compile_process.returncode != 0:
                return jsonify({'output': f'Compilation Error:\n{compile_process.stderr.strip()}'})

            # Run the compiled executable
            run_process = subprocess.run([os.path.join(temp_dir, 'user_code')], capture_output=True, text=True)

            # Capture output from the program
            output = run_process.stdout if run_process.returncode == 0 else run_process.stderr

        except Exception as e:
            output = f'Error during execution: {str(e)}'

    return jsonify({'output': output.strip()})  # Strip output to clean any leading/trailing whitespace

if __name__ == '__main__':
    app.run(port=5004)