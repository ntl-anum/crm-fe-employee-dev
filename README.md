
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description

This project handles the Client Side for Configurations for New CRM. This includes handling following services:
- Service Managament
- Plan Managament
- Tax Managament
- Bundle Managament
- Installment Managament
- Hardware Managament
- Billing Managament

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NTL-ES/crm-fe-config
   ```
2. Install the packages
    ```bash
    $ npm install
    ```
## Requirements
- Generate SSL Certificates
   ```bash
      $ openssl genrsa -out key.pem 2048 
      $ openssl req -new -key key.pem -out csr.pem 
      $ openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
    ```
   
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## PlantUML

Production Environment: [PlantUML](https://www.plantuml.com/plantuml/duml/pP4nQyCm48Lt_OfhEdGAE6qQagMaJYpeLcZ_WB1FjeWi1KbkXvB_NicMYOYXQpqOmxt7Uz_fzjOnuxfMaZlNO8lGiFA4XaZa3fm68-h6GIKCbaveHSW3VA0V86UTTC2rSb1ggKqmrmPH4NiIwimCQqSNzQP3y4H3pF1z89GL5SO4pO592MTFm6gq8L5pllnkXCCaDUgv_zL6TweQikyfFQwEDARtIQnqslGv5JEdMxn1phMfqCI8BDkii-pMCl2d1jznH2uK0ZLUH5NvJlCbIhGZ7eb_M4mi2s0MQ04_18O2M1oqugBsmruhE-jqYuQGIr8L5lwxAJWcHNae8W3XWapLClWAUErS4-GnTTNJ05nNl_e71M3ouhijpNVRKPq-P5Hkxnzc5-A_2TKXBfwIFSw2R3XGolKq2wvSI2bK3IdPUXPazFCzXNgU1TIRSg9bJcXbKxZDly1T226qWENo1VA2x3r7ryfV)

