declare namespace App {
    interface Locals {
        user?: {
            id: string;
            email: string;
            name: string;
            [key: string]: any;
        };
    }
}
