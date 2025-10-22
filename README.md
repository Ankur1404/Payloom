# Payroll
Payroll is a backend-only subscription management system that handles subscription creation, automated reminders, and renewal notifications. This project currently focuses on backend functionality and does not include a user interface (UI). It's built to handle subscription workflows, integrate with external services (such as Arcjet for rate limiting and Upstash for real-time data storage), and send automated email notifications.


## Features

- **Subscription Management**: Users can subscribe, update, and manage different subscription plans.
- **Automated Email Reminders**: Sends automated reminders about upcoming subscription renewals.
- **Rate Limiting**: Uses **Arcjet** for preventing abuse and rate-limiting requests to the API.
- **Upstash Integration**: Efficient data management and reminder workflow with **Upstash**.
- **Future Enhancements**: Role-based access and subscription plans (Free, Basic, Premium) are planned for the future.

## Getting Started

### Prerequisites

- **Node.js** (v14+)
- **MongoDB** (local or cloud)
- **Upstash** account for data storage
- **Arcjet** API Key for rate-limiting

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Ankur1404/payloom.git
    cd payloom
    # If your project folder is named 'subscription'
    cd subscription

    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongo_connection_string
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password
    ARCJET_API_KEY=your_arcjet_api_key
    QSTASH_TOKEN=your_qstash_token
    QSTASH_URL=your_qstash_url
    ```

4. Start the server:
    ```bash
    npm start
    ```

The server will be running at `http://localhost:5000`.

## API Endpoints

- **POST /auth/register**: Register a new user.
- **POST /subscriptions**: Create a new subscription.
- **GET /subscriptions/:id**: Get subscription details by ID.

## Email Reminders

The system sends out automated email reminders for upcoming subscription renewals. The reminders are sent in the following pattern:

- **7 days before**
- **5 days before**
- **2 days before**
- **1 day before**

The emails contain information about the user's subscription plan, price, payment method, and renewal date.

## Rate Limiting

Arcjet is used for rate-limiting to prevent abuse of the API. It limits the number of requests a user can make within a specific time frame.

## Future Enhancements

- **Role-Based Access**: Implement role-based access for admin and user roles.
- **Subscription Plans**: Add Free, Basic, and Premium subscription plans.
- **Payment Integration**: Integrate payment gateways to manage real transactions.

## Contributing

Feel free to fork this repository, create a branch, and submit pull requests for improvements or bug fixes. All contributions are welcome!
