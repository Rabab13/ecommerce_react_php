import fetch from "node-fetch";

export const handler = async (event) => {
  // Handle OPTIONS for CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        error: "Method not allowed",
        message: "Use POST for GraphQL requests",
        usage: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { query: "Your GraphQL query", variables: {} }
        }
      }),
    };
  }

  try {
    const response = await fetch("https://ecommercereactphp-production.up.railway.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": event.headers.origin || ""
      },
      body: event.body,
    });

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};