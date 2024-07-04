# SPYNE Assignment

## Table of Contents

1. [Directory Structure](#directory-structure)
2. [Configuration](#configuration)
3. [Controllers](#controllers)
4. [Middlewares](#middlewares)
5. [Models](#models)
6. [Routes](#routes)
7. [Service Configuration](#service-configuration)
8. [Services](#services)
## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/anuragsingh1409/spyne-assignment.git
    ```
2. Navigate to the project directory:
    ```sh
    cd SPYNE-ASSIGNMENT
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
### Configuration
1. Create a `.env` file in the root directory and add your environment variables. For example:
    ```env
    DB_URL=your-database-connection-string
    TOKEN_SECRET_KEY=secret-key-for-jsonwetoken
    AWS_S3_CREDENTIALS_ACCESS_KEY=your-aws-access-key-id
    AWS_S3_CREDENTIALS_SECRET_KEY=your-aws-secret-access-key
    S3_REGION
    NODE_ENV
    STORAGE_BUCKET_NAME

    ```

### Running the Application
1. Start the development server:
    ```sh
    npm run dev
    ```


## Configuration

### `config/databaseConnection.js`

Contains the configuration for connecting to the database. Ensure that the correct database credentials and settings are specified here.

## Controllers

### Discussion Service

- **`discussionService/comment.js`**: Handles commenting functionality within discussions.
- **`discussionService/createDiscussion.js`**: Manages the creation of new discussions.
- **`discussionService/discussionOperations.js`**: Contains various operations related to discussions.
- **`discussionService/likeOperation.js`**: Manages like operations on discussions.
- **`discussionService/modifyDiscussion.js`**: Handles modifications to existing discussions.

### User Service

- **`userService/followUser.js`**: Manages user following functionality.
- **`userService/getUser.js`**: Retrieves user information.
- **`userService/modifyUser.js`**: Handles modifications to user profiles.
- **`userService/auth.js`**: Manages authentication operations.

## Middlewares

### `middlewares/auth.js`

Contains middleware for handling authentication and authorization.

## Models

- **`models/Comment.js`**: Schema and model for comments.
- **`models/Discussion.js`**: Schema and model for discussions.
- **`models/Like.js`**: Schema and model for likes.
- **`models/likeOnCommentSchema.js`**: Schema for likes on comments.
- **`models/ReplyOnComment.js`**: Schema and model for replies on comments.
- **`models/User.js`**: Schema and model for users.

## Routes

### Discussion Routes

- **`routes/discussion/index.js`**: Main router for discussion-related routes.
- **`routes/discussion/privateRoutes.js`**: Private routes for discussions, accessible only to authenticated users.
- **`routes/discussion/publicRoutes.js`**: Public routes for discussions, accessible to all users.

### User Routes

- **`routes/user/index.js`**: Main router for user-related routes.
- **`routes/user/privateRoutes.js`**: Private routes for users, accessible only to authenticated users.
- **`routes/user/publicRoutes.js`**: Public routes for users, accessible to all users.

### Authentication Routes

- **`routes/auth.js`**: Routes for authentication operations.

### Main Routes

- **`routes/index.js`**: Main entry point for the application's routes.

## Service Configuration

### `serviceConfig/multerConfig.js`

Configuration for Multer, a middleware for handling `multipart/form-data`, primarily used for uploading files.

### `serviceConfig/s3Bucket.js`

Configuration for connecting to an Amazon S3 bucket for file storage.

## Services

### `services/s3BucketService.js`

Contains the logic for interacting with the Amazon S3 bucket, including uploading and retrieving files.

---

Ensure you have all necessary environment variables set up for database connections, S3 bucket access, and other configurations as specified in the respective configuration files.

