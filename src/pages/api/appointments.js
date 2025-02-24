export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
   console.log("🔍 Checking environment variables...");
   console.log("API_USERNAME:", process.env.API_USERNAME ? "Exists" : "❌ Missing");
   console.log("API_PASSWORD:", process.env.API_PASSWORD ? "Exists" : "❌ Missing");
    // Load credentials from environment variables
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
  
    if (!username || !password) {
      return res.status(500).json({ message: "Missing API credentials" });
    }
  
    // Encode credentials for Basic Authentication
    const credentials = Buffer.from(`${username}:${password}`).toString("base64");
  
    try {
      // Fetch appointments from external API
      const response = await fetch(
        "https://sage-hospital.onrender.com/api/v1/appointments",
        {
          headers: {
            Authorization:"Bearer" + accessToken ,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data); // Return the appointments
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  