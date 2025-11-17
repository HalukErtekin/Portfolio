# halukertekin.com – Personal Portfolio

Personal website of **Haluk Ertekin**, a Computer Engineering student from Istanbul focusing on AWS cloud, Linux/Nginx administration, Oracle SQL & PL/SQL, low-level C programming, and security fundamentals.  
The site is built with Next.js (App Router) and deployed on an AWS EC2 instance behind Nginx with full SSL and systemd-based process management.

## Tech Stack

- **Frontend:** Next.js 13+, React 18, TypeScript, Tailwind CSS, Contentlayer + MDX
- **UI:** Dark theme cards, particles background, Lucide icons
- **Content:** Projects and long-form notes stored as MDX under `content/projects`
- **Deployment:** AWS EC2 (Amazon Linux 2023), Nginx reverse proxy, Let’s Encrypt SSL, Node.js + pnpm runtime, systemd service for `pnpm start`

## Key Projects Featured

1. **AWS EC2 Web Server & Portfolio Deployment**  
   Full infrastructure setup for halukertekin.com on EC2 with hardened Security Groups, Hostinger DNS, Nginx + Let’s Encrypt, and a Git-based deployment pipeline (`git pull && pnpm build && sudo systemctl restart portfolio`).

2. **Oracle SQL & PL/SQL Practice (HR Schema Labs)**  
   Advanced Oracle SQL and PL/SQL exercises: joins, analytic/window functions, packages, triggers, cursors, and schema modelling with Oracle Data Modeler.

3. **C Programming & Systems Journey**  
   CS50-inspired C exercises covering pointers, dynamic memory, CLI tools, credit-card validators, and text-processing utilities while mastering manual memory management.

4. **Data Mining & Machine Learning Study Projects**  
   Python notebooks with pandas and scikit-learn covering decision trees, entropy/Gini metrics, feature importance, and overfitting vs. regularization on tabular datasets.

5. **Image Processing Labs (MATLAB)**  
   MATLAB-based labs implementing spatial filters (low/high-pass, Laplacian, unsharp masking, high-boost, nonlinear filters) with exam-style manual calculations.

Each project lives as an MDX article under `content/projects` and powers both the `/projects` grid and the `/projects/[slug]` detail pages.

## Getting Started

```bash
pnpm install        # install dependencies
pnpm dev            # start Next.js locally
pnpm build          # production build
pnpm start          # run the compiled app
```

> Requires Node.js 18+, pnpm, and Contentlayer (auto-generated on `pnpm dev`/`pnpm build`).

### Content Editing

- Add or edit project files in `content/projects/*.mdx`.
- Frontmatter should include: `title`, `description`, `date`, `slug`, `published`, plus optional `url` and `repository`.
- Contentlayer regenerates on every build; no manual steps needed.

## Deployment Workflow

1. Develop locally and push to GitHub (`git add . && git commit && git push`).
2. SSH into the EC2 instance (`/var/www/portfolio`).
3. Pull latest changes and rebuild:

   ```bash
   git pull
   pnpm install --frozen-lockfile
   pnpm build
   sudo systemctl restart portfolio
   ```

4. Nginx serves the production build with SSL certificates managed by Certbot.

## Credits

- Based on the excellent open-source template [chronark/chronark.com](https://github.com/chronark/chronark.com) (MIT).  
  All layout, animation, and theming foundations come from Chronark’s work; content and infrastructure now reflect Haluk Ertekin’s personal portfolio.
