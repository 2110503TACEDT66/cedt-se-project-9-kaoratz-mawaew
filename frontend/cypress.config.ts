import Manager from "@/components/managerDashboard/Manager";
import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000",
    },
    env: {
        userEmail: "dick@dick.com",
        userPassword: "dickdick",
        managerEmail: "nightfall@gmail.com",
        managerPassword: "12345678",
        adminEmail: "admin@admin.com",
        adminPassword: "123456",
    },
});