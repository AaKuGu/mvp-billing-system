// 🔹 Generic reusable API call
export const api_request = async (
  endpoint,
  method = "GET",
  body = null,
  headers = {}
) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(endpoint, options);

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        message: `Server Error (${res.status}): ${errorText || res.statusText}`,
      };
    }

    const json = await res.json();

    return {
      success: true,
      data: json.data || json,
      message: json.message || "Success",
    };
  } catch (error) {
    console.error("❌ API Request Failed:", error);
    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

