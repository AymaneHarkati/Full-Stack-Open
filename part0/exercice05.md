```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: sends GET request 
    server-->>browser: send html page
	server-->>browser: send spa.js page
    server-->>browser: send data.json
```