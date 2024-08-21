# YouTube Companion - Open Source Project 🎥

An open-source YouTube companion bot that lets you query large YouTube playlists and videos in natural language.

### Postman Collection V1 📚
[Postman Collection](https://documenter.getpostman.com/view/25186829/2sA3JFAjQn)

### Technology Stack 🧰

The YouTube Companion project utilizes the following technologies:

- **Python (Django)**: Django is a high-level Python web framework used for backend development.
- **JavaScript (React)**: React is a JavaScript library for building user interfaces, used for frontend development in this project.
- **TiDB MySQL**: an open-source distributed SQL database that supports Hybrid Transactional and Analytical Processing (HTAP) workloads
- **TiDB Vector Search**: Build MySQL apps faster and cheaper with TiDB Serverless.
- **NLTK (Natural Language Toolkit)**: NLTK is a leading platform for building Python programs to work with human language data.
- **Jina AI Embeddings**: Multimodal, bilingual long-context embeddings for your search and RAG.

---

### Setup Instructions 🛠️

Follow these steps to set up the frontend and backend of the YouTube Companion project:

#### Frontend Setup

1. **Navigate to the `frontend` folder**:
   ```bash
   cd frontend
   ```

2. **Create a `.env.local` file**:
   ```bash
   touch .env.local
   ```

3. **Add the following environment variables to `.env.local`**:
   ```bash
   NEXT_PUBLIC_AI_SERVICE_URL=<Your_AI_Service_URL>
   NEXT_PUBLIC_FIREBASE_API_KEY=<Your_Firebase_API_Key>
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<Your_Firebase_Auth_Domain>
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=<Your_Firebase_Project_ID>
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<Your_Firebase_Storage_Bucket>
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<Your_Firebase_Messaging_Sender_ID>
   NEXT_PUBLIC_FIREBASE_APP_ID=<Your_Firebase_App_ID>
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<Your_Firebase_Measurement_ID>
   NEXT_PUBLIC_WEB_URL=http://localhost:3000
   ```

4. **Install the required dependencies**:
   ```bash
   yarn install
   ```

5. **Start the development server**:
   ```bash
   yarn dev
   ```

#### Backend Setup

1. **Navigate to the `yt_companion_api` folder**:
   ```bash
   cd yt_companion_api
   ```

2. **Create a `.env` file**:
   ```bash
   touch .env
   ```

3. **Add the following environment variables to `.env`**:
   ```bash
   #------------- DJANGO SECRET KEY -------------
   SECRET_KEY=<Your_Django_Secret_Key>

   #------------ FIREBASE CREDENTIALS -----------
   FIREBASE_ACCOUNT_TYPE=service_account
   FIREBASE_PROJECT_ID=<Your_Firebase_Project_ID>
   FIREBASE_PRIVATE_KEY_ID=<Your_Firebase_Private_Key_ID>
   FIREBASE_PRIVATE_KEY=<Your_Firebase_Private_Key>
   FIREBASE_CLIENT_EMAIL=<Your_Firebase_Client_Email>
   FIREBASE_CLIENT_ID=<Your_Firebase_Client_ID>
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/<Your_Firebase_Client_Email>

   #----------- TIDB -----------------------------
   TIDB_HOST=<Your_TiDB_Host>
   TIDB_NAME=<Your_TiDB_Name>
   TIDB_PASSWORD=<Your_TiDB_Password>
   TIDB_PORT=4000
   TIDB_USER=<Your_TiDB_User>
   TIDB_CA_PATH=./yt_companion_api/ca_cert.pem

   #---------- JINA_AI --------------------------
   JINA_AI_API_KEY=<Your_Jina_AI_API_Key>
   ```

4. **Apply migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run the development server**:
   ```bash
   python manage.py runserver
   ```

---

### Contribution Guidelines 🛠️

Thank you for considering contributing to the YouTube Companion project. Before making any contributions, please take a moment to review the following guidelines:

1. **Fork the Repository**: Fork the repository to your GitHub account before making any changes.

2. **Branching**: Create a new branch for each feature or bug fix you work on. This helps keep the main codebase clean and makes it easier to review and merge changes.

3. **Coding Standards**: Follow PEP 8 guidelines for Python code and adhere to consistent coding styles throughout the project. For JavaScript, follow the Airbnb JavaScript Style Guide.

4. **Documentation**: Document your code thoroughly using comments and docstrings, especially for any complex or non-obvious functionality and update the postman collection.

5. **Testing**: Write tests for new features and ensure all existing tests pass before submitting a pull request. We use the Django test framework for backend testing and Jest for frontend testing.

6. **Pull Requests**: Submit a pull request from your forked repository to the `main` branch of the main project repository. Provide a clear and concise description of your changes and reference any relevant issues.

7. **Code Review**: Be open to feedback and participate in the code review process. This helps maintain code quality and fosters collaboration within the community.

### License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for your interest in contributing to YouTube Companion! If you have any questions or need further assistance, feel free to reach out to the project maintainers. Happy coding!
