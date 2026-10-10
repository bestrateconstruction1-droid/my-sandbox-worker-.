export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    
    // Set up standard cross-origin headers so your frontend app can fetch the data
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    };

    // Handle preflight options requests from your app front-end gracefully
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // App Endpoint: Fetch estimation calculations
    if (url.pathname === "/api/estimate") {
      const data = {
        status: "success",
        timestamp: new Date().toISOString(),
        service: "Kitchen & Bath Estimator Engine",
        defaults: {
          laborRatePerHour: 75,
          materialMarkupPercentage: 15
        }
      };
      return new Response(JSON.stringify(data), { headers: corsHeaders });
    }

    // App Endpoint: Check core system status
    if (url.pathname === "/api/status") {
      return new Response(JSON.stringify({ status: "online", system: "Sandbox Worker" }), { headers: corsHeaders });
    }

    try {
      return new Response(JSON.stringify({ message: "App API Gateway Active" }), { headers: corsHeaders });
    } catch (error: any) {
      if (error.code === 'EPERM') {
        return new Response(JSON.stringify({ error: "Sandbox Network Isolation EPERM Blocked" }), { status: 403, headers: corsHeaders });
      }
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },
};
