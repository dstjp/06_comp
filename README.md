# 06_comp - PC Builder

Create your own custom personal computer with PC Builder. Using components, such as: CPU, GPU, RAM, Storage, Motherboard, PSU, and Case, the user can create their own PC. Under the View PC tab, the user is able to see the computers they have made along with specifications of each component.

## Installation

Before you begin, ensure you have the following installed on your computer:

- Node.js (v16 or higher): [Download Node.js](https://nodejs.org/en)

### How to Run

1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/dstjp/06_comp.git
```

Navigate into the project folder:

```bash
cd 06_comp
```

2. Install Dependencies

Install dependencies for both the frontend and backend from the root directory.

Run the following command:

```bash
npm install
```

Then also install dependencies for each part.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Create a config.env file in the backend folder.

- `MONGO_URI=yourmongouri`
- `PORT=portnumber`
- `SECRETKEY=secretkey`

\*Currently this website is not in production and only people who have been given the config.env file information can get full use of the website.

4. Start the Application

It is recommended to have 2 terminals open when starting the application. One for backend, and one for frontend

```bash
# Start backend server
cd backend
node server.js

# Start frontend server in a separate terminal
cd frontend
npm run dev
```

## Requirements

The API provides endpoints with at least 3 different HTTP verbs. Those HTTP verbs are used correctly - Completed

The API responds with at least 4 different HTTP status codes depending on the endpoint, input and response. The status codes are appropriate for the data being returned - Completed

The API stores it's data in a database. Restarting the API has no effect on the API itself, making it stateless. - Completed

## Questions

Q: A file in the repository explains with at least 4 sentences, maximum 50, how you ensured the application was accessible and SEO-friendly (with a focus on accessibility)

A: To make my application accessible to all users, I’ve implemented key web accessibility best practices. This includes using semantic HTML to give content clear structure and meaning, ensuring strong color contrast for readability, applying appropriate ARIA roles and attributes, and enabling full keyboard navigation to support users who rely on non-mouse input.

For better SEO, I’ve included a well-crafted meta description that summarizes the app’s content. This not only helps search engines understand the page but also improves visibility in search results, potentially boosting traffic through more relevant and enticing snippets.

Q: A file in the repository explains with at least 2 sentences, maximum 50, what type of tracking you have implemented, why, and how it takes into consideration your users privacy.

A: The application uses Google Analytics to track user interactions with features and to provide insight for improvements where users interact the most. Google Analytics checks how many new users register for the website, what areas of the website they visit the most, how the user found the website(direct or unassigned). The user is completely anonymous during this process so Google Analytics does not know who the actual users are ensuring privaacy.

Q: A file in the repository explains with at least 5 sentences, maximum 50, at least 2 common threats and vulnerabilities that your project might be vulnerable too. Going into detail over one of them, explaining how you have mitigated yourself against it.

A: The two most dire possible threats to the application is people accessing the website and Create Account functionality. When creating an account the user is required to put in username, email, and password. However, there is no confirmation whether the email exist because the application does not request a verification code. Anyone could use anyones email and make it unavailable for the person who actually owns the email.

The Login ensures that people who have created an account is only allowed to use the website. This mitigates against certain bots trying to access the website and overload the server in case of a DDoS attack. Only if you're logged in will you be able to create a build and subsequently view those builds, and the builds showcased are the ones the user have created. Using JWT the user's key, value is encrypted adding an extra level of security incase hackers try to change requests from the frontend to the backend.
