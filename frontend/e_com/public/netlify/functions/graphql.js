import fetch from "node-fetch";

export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method not allowed. Use POST for GraphQL requests" }),
        };
    }

    try {
        const response = await fetch("https://ecommercereactphp-production.up.railway.app/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: event.body,
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Error occurred:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal server error" }),
        };
    }
};
