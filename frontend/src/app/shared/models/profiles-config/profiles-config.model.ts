export class ProfilesConfig {
  config = [
    {
      name: "bot-coins",
      pages: [
        {
          path: "/dashboard",
          endPoint: ["/events", "/executed-strategies", "/balance", "/currency"],
          rule: "read"
        },
        {
          path: "/robots",
          endPoint: ["/instance"],
          rule: "read"
        },
        {
          path: "/strategies",
          endPoint: ["/config"],
          rule: "read"
        }
      ]
    },
    {
      name: "bot-garch",
      pages: [
        {
          path: "/dashboard",
          endPoint: ["/band", "/candle", "/order"],
          rule: "read"
        },
        {
          path: "/robots",
          endPoint: ["/instance"],
          rule: "read"
        },
        {
          path: "/strategies",
          endPoint: ["/config"],
          rule: "read"
        }
      ]
    },
    {
      name: "bot-market",
      pages: [
        {
          path: "/dashboard",
          endPoint: ["/liquidate", "/order"],
          rule: "read"
        },
        {
          path: "/robots",
          endPoint: ["/instance"],
          rule: "read"
        },
        {
          path: "/strategies",
          endPoint: ["/config"],
          rule: "read"
        }
      ]
    },
    {
      name: "bot-telegram",
      pages: [
        {
          path: "/dashboard",
          endPoint: ["/events", "/metrics"],
          rule: "read"
        },
        {
          path: "/robots",
          endPoint: ["/instance"],
          rule: "read"
        },
        {
          path: "/strategies",
          endPoint: ["/config", "/header"],
          rule: "read"
        }
      ]
    },
    {
      name: "general-system",
      pages: [
        {
          path: "/dashboard",
          endPoint: ["/events"],
          rule: "read"
        },
        {
          path: "/exchanges",
          endPoint: ["/exchange"],
          rule: "read"
        },
        {
          path: "/groups",
          endPoint: ["/group"],
          rule: "read"
        },
        {
          path: "/profiles",
          endPoint: ["/profile"],
          rule: "read"
        },
        {
          path: "/subscribers",
          endPoint: ["/topic"],
          rule: "read"
        },
        {
          path: "/users",
          endPoint: ["/user"],
          rule: "read"
        }
      ]
    }
  ];
}
