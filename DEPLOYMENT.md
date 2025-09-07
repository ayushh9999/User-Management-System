# Deployment Guide

This guide covers various deployment options for the User Management System.

## Prerequisites

- Node.js application is running locally
- MongoDB database is set up
- Git repository is ready

## Local Development Setup

```bash
# Clone the repository
git clone https://github.com/ayushh9999/User-Management-System.git
cd User-Management-System

# Install dependencies
npm install

# Start MongoDB (if not running as service)
mongod

# Run the application
npm start
```

## Environment Variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update the values as needed:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/testapp1
NODE_ENV=production
```

## Deployment Options

### 1. Heroku Deployment

#### Prerequisites
- Heroku CLI installed
- Heroku account created

#### Steps

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

4. **Add MongoDB Atlas**
   ```bash
   # Add MongoDB Atlas add-on
   heroku addons:create mongolab:sandbox
   
   # Or set custom MongoDB URI
   heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Open App**
   ```bash
   heroku open
   ```

### 2. DigitalOcean Droplet

#### Prerequisites
- DigitalOcean account
- SSH access to droplet

#### Steps

1. **Create Droplet**
   - Choose Ubuntu 20.04 LTS
   - Select appropriate size
   - Add SSH key

2. **Connect to Droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Node.js and MongoDB**
   ```bash
   # Update system
   apt update && apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt-get install -y nodejs
   
   # Install MongoDB
   wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
   apt-get update
   apt-get install -y mongodb-org
   
   # Start MongoDB
   systemctl start mongod
   systemctl enable mongod
   ```

4. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/ayushh9999/User-Management-System.git
   cd User-Management-System
   
   # Install dependencies
   npm install
   
   # Install PM2 for process management
   npm install -g pm2
   
   # Start application with PM2
   pm2 start app.js --name "user-management"
   pm2 startup
   pm2 save
   ```

5. **Configure Nginx (Optional)**
   ```bash
   # Install Nginx
   apt install nginx -y
   
   # Create Nginx configuration
   nano /etc/nginx/sites-available/user-management
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   # Enable site
   ln -s /etc/nginx/sites-available/user-management /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

### 3. AWS EC2 Deployment

#### Prerequisites
- AWS account
- EC2 instance created

#### Steps

1. **Launch EC2 Instance**
   - Choose Amazon Linux 2 AMI
   - Select t2.micro (free tier)
   - Configure security group (ports 22, 80, 3000)

2. **Connect and Setup**
   ```bash
   # Connect to instance
   ssh -i your-key.pem ec2-user@your-instance-ip
   
   # Install Node.js
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   nvm install 18
   nvm use 18
   
   # Install MongoDB
   sudo yum update -y
   sudo yum install -y docker
   sudo service docker start
   sudo docker run -d -p 27017:27017 mongo:latest
   ```

3. **Deploy Application**
   ```bash
   # Clone and setup
   git clone https://github.com/ayushh9999/User-Management-System.git
   cd User-Management-System
   npm install
   
   # Install PM2
   npm install -g pm2
   pm2 start app.js
   pm2 startup
   pm2 save
   ```

### 4. Vercel Deployment (Frontend Only)

For deploying just the frontend (if you separate it):

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
```

### 5. Railway Deployment

#### Steps

1. **Connect GitHub**
   - Go to railway.app
   - Connect your GitHub account
   - Select the repository

2. **Configure Environment**
   - Add environment variables
   - MONGODB_URI, PORT, etc.

3. **Deploy**
   - Railway automatically deploys on push

## Database Deployment

### MongoDB Atlas (Cloud)

1. **Create Cluster**
   - Sign up at mongodb.com/atlas
   - Create free tier cluster
   - Configure network access
   - Create database user

2. **Get Connection String**
   ```
   mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/testapp1
   ```

3. **Update Environment Variable**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xyz.mongodb.net/testapp1
   ```

## Domain Configuration

### Custom Domain Setup

1. **Buy Domain** (GoDaddy, Namecheap, etc.)

2. **Configure DNS**
   - Point A record to your server IP
   - Add CNAME for www subdomain

3. **SSL Certificate**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Get certificate
   sudo certbot --nginx -d yourdomain.com
   ```

## Monitoring and Logging

### PM2 Monitoring
```bash
# View logs
pm2 logs

# Monitor processes
pm2 monit

# Restart application
pm2 restart user-management
```

### Application Monitoring
- Use tools like New Relic, DataDog
- Set up health check endpoints
- Monitor database performance

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use secure secret management

2. **Database Security**
   - Use strong passwords
   - Enable authentication
   - Configure firewall rules

3. **Server Security**
   - Keep system updated
   - Use SSH keys only
   - Configure fail2ban
   - Use HTTPS

## Performance Optimization

1. **Caching**
   - Implement Redis for session storage
   - Cache database queries

2. **Load Balancing**
   - Use multiple server instances
   - Configure load balancer

3. **Database Optimization**
   - Add database indexes
   - Optimize queries
   - Monitor performance

## Backup Strategy

1. **Database Backup**
   ```bash
   # MongoDB backup
   mongodump --db testapp1 --out /backup/
   ```

2. **Automated Backups**
   - Set up cron jobs
   - Use cloud backup services

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

2. **MongoDB Connection**
   ```bash
   # Check MongoDB status
   systemctl status mongod
   
   # Restart MongoDB
   systemctl restart mongod
   ```

3. **Permission Issues**
   ```bash
   # Fix file permissions
   chown -R $USER:$USER /path/to/app
   ```

## Support

- Check application logs
- Monitor system resources
- Use proper error handling
- Implement health checks

---

Choose the deployment option that best fits your needs and budget. For beginners, Heroku or Railway provide the easiest deployment experience.
