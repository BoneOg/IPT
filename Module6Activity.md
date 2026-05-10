Module 6: Cloud Integration
6.1 Cloud Services
In the modern digital era, cloud services have revolutionized how individuals and organizations manage, store, and process data. Instead of relying on local servers or personal computers, cloud computing delivers computing resources—such as storage, applications, and processing power—over the internet, often referred to as “the cloud.” This model allows users to access information and applications anytime and anywhere, provided there is an internet connection. Cloud services have become the foundation of digital transformation, enabling scalability, cost-efficiency, and collaboration across industries.
 
Cloud services refer to on-demand computing resources and applications provided over the internet by third-part vendors. These services eliminate the need for organizations to own and maintain physical infrastructure. In essence, the cloud allows computing to be treated as a utility—like electricity or water—where users pay only for what they use.
 
The National Institute of Standards and Technology (NIST) defines cloud computing as model that enables “ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources” that can be rapidly provisioned and released with minimal management effort.
 
6.1.1 Types of Cloud Service Models
 
Cloud services are typically divided into three main categories known as service models:
 
6.1.1.1 Infrastructure as a Service (IaaS)
        	IaaS provides virtualized computing resources over the internet, such as servers, networks, and storage. Users rent infrastructure from a cloud provider instead of purchasing physical servers.
·      Example: Amazone Web Services (AWS) EC2, Microsoft Azure Virtual Machines, Google Compute Engine (GCP)
 
6.1.1.2 Platform as a Service (PaaS)
        	PaaS provides a framework that allows developers to build, test, and deploy applications without managing the underlying hardware or software layers.
·      Example: Google App Engine, Microsoft Azure App Service, Heroku
6.1.1.3 Software as a Service (SaaS)
        	SaaS delivers fully functional applications over the internet that users can access through web browser or mobile apps.
·      Example: Google Workspace, Microsoft 365, Salesforce, Zoom
 
6.1.1.4 Cloud Deployment Models
        	Cloud services can be deployed in different configurations based on user needs and security requirements.
        	
6.2 Microservices Architecture
In modern software engineering, application are increasingly designed as modular, distributed systems rather than large, monolithic programs. Microservices architecture (MSA) is a design approach in which an application is built as a collection of small, independent services that communicate over a network. Each service is loosely coupled, autonomous, and focuses on a specific business capability.
Microservices have become the preferred architecture for cloud-native applications, scalable web services and enterprise systems because they address many limitations of traditional monolithic applications, such as slow development cycles, difficult maintenance, and poor scalability.
 
 
6.2.1 Characteristics of Microservices
·      Single Responsibility
o   Each service focuses on one business domain or function.
·      Autonomy
o   Services can be developed, deployed and scaled independently
·      Loose Coupling
o   Changes in one service do not directly affect others.
·      Technology Heterogeneity
o   Each service can use a different programming language, database, or framework if needed.
·      Decentralized Data Management
o   Each service can manage its own database, rather than relying on a single centralized database.
·      Communication via APIs
o   Services interact through lightweight protocols such as REST, gRPC, or message queues.
6.2.2 Architecture Components
A typical microservices architecture consists of:
o   Microservices Layer
§  Each microservice handles a specific business domain.
o   API gateway
§  Acts as a single entry point for client requests, routing them to the appropriate services.
o   Service Discovery
§  Keeps track of services and their endpoints, enabling dynamic communication.
o   Inter-Service Communication
§  Synchronous: HTTP/REST, gRPC
§  Asynchronous: Messaging Queues (RabbitMQ, Kafka)
o   Database Layer
§  Each service may have its own database (polyglot persistence).
o   Monitoring & Logging
§  Tools like Prometheus, ELK Stack, and Grafana track service health and logs.
6.2.3 Advantages of Microservices
·      Scalability
o   Services can be scaled independently based on demand.
·      Faster Development & Deployment
o   Teams can develop and deploy services independently
·      Resilience & Fault Isolation
o   Failure in one service does not bring down the entire service.
·      Technology Flexibility
o   Teams can choose the best technology stack for each service.
·      Improved maintainability
o   Small focus services are easier to understand and maintain.
6.2.4 Challenges of Microservices
o   Complexity
§  Managing multiple services is more complex than monolith.
o   Inter-Service Communication
§  Network latency, message failures, and retries must be handled.
o   Data Consistency
§  Maintaining consistency across distributed services is challenging.
o   Deployment & DevOps
§  Requires sophisticated CI/CD pipelines, containerization (Docker), and orchestration (Kubernetes)
o   Monitoring & Debugging
§  Distributed systems require centralized logging, tracing, and monitoring.
6.2.5 Microservices vs Monolithic Architecture
 
Feature
Monolithic
Microservices
Deployment
Single deployable unit
Multiple independently deployable services
Scalability
Whole app must scale
Individual services can scale
Development
Slower, team bottlenecks
Faster, multiple teams
Fault Isolation
One failure may affect all
Isolated failures
Technology Stack
One language/database
Polyglot persistence and tech
Complexity
Simpler
More complex, needs orchestration

 
6.2.6 Common Tools & Technologies
·      Containerization: Docker
·      Orchestration: Kubernetes, Docker Swarm
·      API Gateways: Kong, NGINX, AWS API Gateway
·      Messaging Systems: RabbitMQ, Kafka
·      Service Discovery: Consul, Eureka
·      Monitoring: Prometheus, Grafana, ELK Stack
·      CI/CD: Jenkins, GitLab CI, GitHub Actions
6.2.7 Best Practices
·      Keep services small and focused (bounded context)
·      Design for failure and implement retries, circuit breakers, and fallback mechanisms.
·      Implement centralized logging and monitoring
·      Use API gateways for routing, authentication, and rate limiting
·      Automate deployment using CI/CD pipelines and container orchestration
·      Prefer event-driven architecture for asynchronous workflows
Microservices architecture enables scalable, maintainable, and resilient applications. it is ideal for cloud-native development, distributed systems, and enterprises with fast-changing business requirements. While it introduces complexity and operational challenges, adopting best practices, modern DevOps tools, and proper architecture design ensures its success.
6.3 Containerization with Docker
Docker is an open-source containerization platform that enables developers to:
·      Package applications and dependencies into containers
·      Run applications in isolated environments
·      Deploy applications consistently across systems
A Docker container includes:
·      The application code
·      Runtime environment (e.g., Python, Node.js, Java)
·      System libraries and dependencies
Unlike virtual machines, Docker containers share the host operating system kernel making them much lighter, faster, and more efficient.
 
6.3.2 Docker Image
A docker image is a blueprint or template used to create containers. It contains:
·      Base operating system (e.g., Ubuntu, Alpine)
·      Application code
·      Required dependencies
Images are built using a file called Dockerfile.
 
6.3.3 Docker Container
A container is a running instance of a Docker image. It is:
·      Isolated
·      Lightweight
·      Portable
Multiple containers can run on the same machine.
 
6.3.4 Dockerfile
A Dockerfile is a text file containing instructions on how to build an image.
 
FROM python:3.10
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
 
This file:
·      Uses Python as base image
·      Copies application code
·      Installs dependencies
·      Runs the app
 
6.3.5 Docker Hub / Registry
A registry is a storage system for Docker images.
Popular registries:
·      Docker Hub
·      GitHub Container Registry
·      AWS ECR
6.3.6 Docker Workflow
1.     Create Application
Develop your application normally (e.g., Django app).
2.     Write Dockerfile
Define environment and dependencies
3.     Build Image
docker build -t myapp .
4.     Run container
docker run -p 8000:8000 myapp
5.     Deploy
Push image to registry and deploy to servers or cloud.
6.3.7 Docker in Microservices Architecture
In microservices:
·      Each service runs in its own Docker container
·      Each container has its own environment and dependencies
·      Services communicate via APIs or message queues
Example:
Service
Docker Container
User Service
Container 1
Product Service
Container 2
Order Service
Container 3
Database
Container 4

6.3.8 Advantages of Docker
·      Portability
o   Applications run the same on any system with Docker installed
·      Lightweight
o   Uses fewer resources than virtual machines
·      Faster Deployment
o   Containers start in seconds
·      Consistency
o   Eliminates environment-related issues.
·      Scalability
o   Easily scale services by running more containers
6.3.9 Challenges and limitations
·      Security risks if containers are misconfigured
·      Requires learning new tools and workflows
·      Managing many containers becomes complex (solved by Kubernetes)
·      Persistent storage must be handled carefully
 
Docker vs Virtual Machine
Feature
Docker Containers
Virtual Machines
Startup Time
Seconds
Minutes
Size
Small (MBs)
Large (GBs)
OS
Shares host OS
Has own OS
Performance
Near native
Slower
Isolation
Process-level
Full OS

 
Best Practices
·      Use small base images (e.g., Alpine Linux)
·      Avoid running containers as root
·      Use environment variables for configuration
·      Keep images updated
·      Use Docker Compose for multi-container app
 
Containerization with Docker revolutionized how application are built and deployed. By packaging applications with their dependencies into lightweight containers, Docker ensures consistency, portability, and efficiency across environments. It plays a critical role in microservices architecture, DevOps automation, and cloud-native development.
 
As systems continue to grow in complexity, Docker remains an essential tool for modern software engineers and IT professionals.
 
6.4 Cloud Deployment Patterns
Cloud computing has transformed how applications are built, deployed, and scaled. Instead of relying on physical servers and fixed infrastructure, organizations now use cloud platforms such as Amazon Web Services (AWS), Microsoft Azure, and Google cloud platforms (GCP) to host applications dynamically.
 
To ensure reliability, scalability, performance, and cost-effeciency, architects use cloud deployment patterns —proven architectural approaches for deploying applications and services in the cloud. These patterns help address common challenges such as traffic spikes, system failures, updates, and data distribution.
 
6.4.2 What are cloud deployment patterns?
Cloud deployment patterns are standardized architectural solutions for organizing and managing cloud-based systems. They define how applications are:
·      Distributed across servers or regions
·      Scaled based on demand
·      Updated with minimal downtime
·      Protected from failures
These patterns leverage cloud-native features such as load balancing, auto-scaling, redundancy, and managed services.
 
6.4.3 Single-Instance Pattern
In the single-instance pattern, an application runs on one virtual machine (VM) or container in the cloud. This is the simplest deployment approach and is often used for:
·      Development environments
·      Testing systems
·      Small applications
 
6.4.4 Load-Balanced pattern
In this pattern, multiple instances of an application run simultaneously behind a load balancer, which distributes user traffic evenly among them.
 
6.4.5 Auto-Scaling Pattern
Auto-scaling dynamically adjusts the number of application instances based on system load (CPU usage, memory, or request volume).
 
 
6.4.6 Multi-Tier Architecture Pattern
The application is divided into layers; (1) Presentation Layer (Frontend), (2) Application layer (Backend services), (3) Data layer (databases)
 
 
6.4.7 Microservices Deployment Pattern
Applications are deployed as multiple independent microservices, often in containers, each handling a specific function.
Quiz
Quiz 1: Cloud Services and Deployment (Multiple Choice – 20 items)
Instructions: Choose the correct answer. Each item is labeled according to Bloom’s Taxonomy level.
Cloud computing delivers computing resources over the ______. (Remembering)
 A. Local area network
 B. Internet
 C. Personal computer
 D. Physical server
Which organization provided the formal definition of cloud computing? (Remembering)
 A. ISO
 B. IEEE
 C. NIST
 D. W3C
Which cloud service model provides virtual machines and storage? (Understanding)
 A. SaaS
 B. PaaS
 C. IaaS
 D. FaaS
AWS EC2 is an example of which service model? (Understanding)
 A. SaaS
 B. PaaS
 C. IaaS
 D. Hybrid Cloud
Which cloud model allows developers to deploy applications without managing servers? (Understanding)
 A. IaaS
 B. PaaS
 C. SaaS
 D. On-Premise
Google Workspace is an example of ______. (Remembering)
 A. IaaS
 B. PaaS
 C. SaaS
 D. Private Cloud
Which deployment pattern uses only one VM or container? (Remembering)
 A. Auto-scaling Pattern
 B. Load-balanced Pattern
 C. Single-instance Pattern
 D. Multi-tier Pattern
Which pattern distributes traffic among multiple instances? (Understanding)
 A. Single-instance Pattern
 B. Load-balanced Pattern
 C. Auto-scaling Pattern
 D. Microservices Pattern
Auto-scaling primarily reacts to which condition? (Understanding)
 A. User location
 B. CPU or resource utilization
 C. Database type
 D. Application language
Which deployment pattern separates frontend, backend, and database layers? (Understanding)
 A. Single-instance
 B. Load-balanced
 C. Multi-tier Architecture
 D. Auto-scaling
Which cloud benefit allows organizations to pay only for what they use? (Applying)
 A. Scalability
 B. Elasticity
 C. Pay-as-you-go
 D. High availability
Which service model offers complete applications to end users? (Remembering)
 A. IaaS
 B. PaaS
 C. SaaS
 D. CaaS
Which cloud platform is developed by Google? (Remembering)
 A. AWS
 B. Azure
 C. GCP
 D. DigitalOcean
Which deployment pattern improves fault tolerance and availability? (Analyzing)
 A. Single-instance
 B. Load-balanced
 C. On-premise
 D. Standalone
Which layer handles user interaction in a multi-tier architecture? (Remembering)
 A. Data layer
 B. Application layer
 C. Presentation layer
 D. Network layer
Which cloud service eliminates the need to maintain physical servers? (Understanding)
 A. Traditional IT
 B. Cloud computing
 C. Local hosting
 D. Desktop virtualization
What component distributes traffic in load-balanced deployments? (Remembering)
 A. API Gateway
 B. Load Balancer
 C. Firewall
 D. Router
Which deployment model is best for small testing environments? (Applying)
 A. Microservices
 B. Auto-scaling
 C. Single-instance
 D. Multi-region
What feature allows systems to handle traffic spikes automatically? (Applying)
 A. Load balancing
 B. Auto-scaling
 C. Backup
 D. Virtualization
Which pattern best supports cloud-native applications? (Analyzing)
 A. Monolithic deployment
 B. Single-instance
 C. Microservices deployment
 D. Standalone server
 
 
Quiz 2: Microservices and Docker (Multiple Choice – 20 items)
Instructions: Choose the correct answer. Each item is labeled according to Bloom’s Taxonomy level.
1. 	Which architecture breaks applications into small independent services? (Remembering)
 A. Monolithic
 B. Layered
 C. Microservices
 D. Client-server
2. 	Which principle ensures each service handles one business function? (Understanding)
 A. Loose coupling
 B. Autonomy
 C. Single responsibility
 D. Scalability
3. 	What component acts as a single entry point for client requests? (Remembering)
 A. Load balancer
 B. API Gateway
 C. Service registry
 D. Database
4. 	REST and gRPC are examples of what type of communication? (Understanding)
 A. Asynchronous
 B. File-based
 C. Synchronous
 D. Batch
5. 	Which tool supports asynchronous communication in microservices? (Remembering)
 A. REST API
 B. RabbitMQ
 C. HTTP
 D. FTP
6. 	Which tool is commonly used for container orchestration? (Remembering)
 A. Docker Hub
 B. Jenkins
 C. Kubernetes
 D. Git
7. 	Docker is primarily used to: (Understanding)
 A. Write application code
 B. Package applications and dependencies
 C. Design databases
 D. Monitor servers
8. 	Which file defines how a Docker image is built? (Remembering)
 A. requirements.txt
 B. docker-compose.yml
 C. Dockerfile
 D. config.yml
9. 	A running instance of a Docker image is called a: (Remembering)
 A. Pod
 B. Volume
 C. Container
 D. Service
10.  Which is the most popular public Docker registry? (Remembering)
 A. GitHub
 B. AWS ECR
 C. Docker Hub
 D. Azure Registry
11.  Which advantage allows microservices to scale independently? (Understanding)
 A. Centralized database
 B. Loose coupling
 C. Single deployment unit
 D. Tight integration
12.  Which challenge involves tracing failures across services? (Analyzing)
 A. Scalability
 B. Monitoring and debugging
 C. Portability
 D. Virtualization
13.  Which Docker command is used to build an image? (Applying)
 A. docker run
 B. docker push
 C. docker build
 D. docker pull
14.  Which tool manages multiple containers as one application? (Understanding)
 A. Docker Compose
 B. Docker Hub
 C. Git
 D. Flask
15.  Why do containers start faster than virtual machines? (Analyzing)
 A. They use their own OS
 B. They share the host OS kernel
 C. They use more memory
 D. They require no configuration
16.  Which architecture has a single deployable unit? (Remembering)
 A. Microservices
 B. Event-driven
 C. Monolithic
 D. Distributed
17.  Which system enables services to locate each other dynamically? (Understanding)
 A. API Gateway
 B. Load balancer
 C. Service discovery
 D. CI/CD pipeline
18.  Which tool is commonly used for monitoring microservices? (Remembering)
 A. GitHub
 B. Prometheus
 C. Docker Hub
 D. NGINX
19.  What type of persistence allows each service to have its own database? (Understanding)
 A. Centralized persistence
 B. Relational persistence
 C. Polyglot persistence
 D. Shared storage
20.  Which DevOps practice automates testing and deployment? (Applying)
 A. Virtualization
 B. CI/CD
 C. Load balancing
 D. Monitoring
Quiz 1: Cloud Services and Deployment – Answer Key
1. 	Internet (Remembering)
2. 	NIST (Remembering)
3. 	IaaS (Understanding)
4. 	IaaS (Understanding)
5. 	PaaS (Understanding)
6. 	SaaS (Remembering)
7. 	Single-instance deployment (Remembering)
8. 	Load-balanced deployment (Understanding)
9. 	Resource utilization (CPU, memory, traffic) (Understanding)
10.  Multi-tier architecture (Understanding)
11.  Pay-as-you-go pricing (Remembering)
12.  SaaS (Remembering)
13.  Google Cloud Platform (GCP) (Remembering)
14.  Load-balanced / redundant pattern (Analyzing)
15.  Presentation layer (Understanding)
16.  Cloud computing / IaaS (Understanding)
17.  Load balancer (Remembering)
18.  Single-instance deployment (Applying)
19.  Auto-scaling (Understanding)
20.  Microservices-based deployment (Analyzing)
Quiz 2: Microservices and Docker – Answer Key
1. 	Microservices architecture (Remembering)
2. 	Single Responsibility Principle (Understanding)
3. 	API Gateway (Understanding)
4. 	Inter-service communication protocols (Understanding)
5. 	Message queue (RabbitMQ, Kafka) (Remembering)
6. 	Kubernetes (Remembering)
7. 	Containerization (Understanding)
8. 	Dockerfile (Remembering)
9. 	Container (Remembering)
10.  Docker Hub (Remembering)
11.  Independent scalability (Analyzing)
12.  Distributed tracing (Analyzing)
13.  docker build (Applying)
14.  Docker Compose (Applying)
15.  Lightweight container runtime (Understanding)
16.  Monolithic architecture (Understanding)
17.  Service discovery (Analyzing)
18.  Prometheus / Grafana (Remembering)
19.  Database-per-service pattern (Analyzing)
20.  Continuous Integration / Continuous Deployment (CI/CD) (Understanding)
Activity 1: Cloud Service Model Comparison
Objective: Understand differences between IaaS, PaaS, and SaaS
Instructions:
1. 	Create a comparison table of IaaS, PaaS, and SaaS.
2. 	Include: description, examples, advantages, and limitations.
3. 	Identify a real-world scenario where each model is most suitable.
Output:
·   	1-page comparison table
·   	Short justification per model
Activity 2: Microservices Architecture Design
Objective: Apply microservices concepts in system design
Instructions:
1. 	Choose an application (e.g., Online Store, Student Portal, Food Delivery App).
2. 	Identify at least 5 microservices.
3. 	Draw a simple architecture diagram showing:
o   API Gateway
o   Services
o   Databases
o   Communication method
4. 	Explain how the system handles failure in one service.
Output:
·   	Architecture diagram
·   	1–2 page explanation
Lab Manual 1: Introduction to Docker Containerization
Objective:
 At the end of this laboratory exercise, students will be able to:
·   	Understand the basics of Docker containerization
·   	Create a Dockerfile
·   	Build a Docker image
·   	Run and verify a Docker container
Estimated Time: 2–3 hours
Requirements:
·   	Laptop or desktop computer
·   	Internet connection
·   	Docker Desktop installed (Windows / macOS / Linux)
·   	Basic knowledge of Python and command line

Step 1: Verify Docker Installation
1. 	Open a terminal or command prompt.
2. 	Run the following command:
docker --version
3. 	If Docker is installed correctly, the Docker version will be displayed.

Step 2: Create Project Directory
1. 	Create a new folder named docker-lab1.
2. 	Navigate to the folder using the terminal:
mkdir docker-lab1
cd docker-lab1

Step 3: Create a Simple Python Application
1. 	Inside the project folder, create a file named app.py.
2. 	Add the following code:
print("Hello from Docker Container!")
3. 	Save the file.

Step 4: Create requirements.txt
1. 	Create a file named requirements.txt.
2. 	(For this simple app, leave it empty or add flask if instructed by your instructor.)

Step 5: Create the Dockerfile
1. 	Create a file named Dockerfile (no extension).
2. 	Add the following content:
FROM python:3.10
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
3. 	Save the file.

Step 6: Build the Docker Image
1. 	In the terminal, run:
docker build -t docker-lab1-app .
2. 	Wait for the image build to complete.
3. 	Verify the image was created:
docker images

Step 7: Run the Docker Container
1. 	Run the container:
docker run docker-lab1-app
2. 	Observe the output displayed in the terminal.

Step 8: Cleanup (Optional)
1. 	Stop running containers:
docker ps
docker stop <container_id>
2. 	Remove container and image if needed:
docker rm <container_id>
docker rmi docker-lab1-app

Expected Output:
·   	Message: Hello from Docker Container!
Guide Questions:
1. 	What role does the Dockerfile play in containerization?
2. 	Why are Docker containers lighter than virtual machines?
3. 	What happens when the container finishes execution?
Lab Manual 2: Django Microservices Deployment Using Docker Compose
Objective:
 At the end of this laboratory exercise, students will be able to:
·   	Build two Django-based microservices
·   	Expose REST-style endpoints using Django
·   	Containerize Django applications
·   	Use Docker Compose to manage multiple Django services
Estimated Time: 3–4 hours
Requirements:
·   	Docker and Docker Compose installed
·   	Python 3.10+
·   	Basic knowledge of Django and REST concepts
·   	Text editor (VS Code recommended)

Step 1: Create Project Structure
1. 	Create a main project folder:
mkdir django-lab2
cd django-lab2
2. 	Create two service folders:
mkdir user_service product_service

Step 2: Create User Service (Django)
1. 	Navigate to the user service folder:
cd user_service
2. 	Create virtual environment and activate it.
3. 	Install Django:
pip install django
4. 	Create Django project:
django-admin startproject userservice .
5. 	Create Django app:
python manage.py startapp users
6. 	In users/views.py, add:
from django.http import JsonResponse
 
def user_service(request):
return JsonResponse({"service": "User Service", "status": "running"})
7. 	In users/urls.py, add:
from django.urls import path
from .views import user_service
urlpatterns = [
path('', user_service),
]
8. 	Update userservice/urls.py:
from django.contrib import admin
from django.urls import path, include
 
urlpatterns = [
path('users/', include('users.urls')),
]
9. 	Add users to INSTALLED_APPS.

Step 3: Dockerize User Service
1. 	Create requirements.txt:
django
2. 	Create Dockerfile:
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

Step 4: Create Product Service (Repeat for Django)
1. 	Go back to root folder and enter product service:
cd ../product_service
2. 	Repeat Steps 2–3, but:
o   Project name: productservice
o   App name: products
o   Endpoint returns:
{"service": "Product Service", "status": "running"}
o   URL path: /products/

Step 5: Create docker-compose.yml
1. 	Return to root directory (django-lab2).
2. 	Create docker-compose.yml:
version: '3.8'
services:
user-service:
build: ./user_service
ports:
- "8001:8000"
product-service:
build: ./product_service
ports:
- "8002:8000"

Step 6: Build and Run Django Microservices
1. 	Run the following command:
docker-compose up --build
2. 	Wait until both services start successfully.

Step 7: Test the Services
1. 	Open a browser.
2. 	Visit:
o   http://localhost:8001/users/ → User Service
o   http://localhost:8002/products/ → Product Service
3. 	Confirm that JSON responses are displayed.

Step 8: Stop and Cleanup
1. 	Stop services:
CTRL + C
2. 	Remove containers:
docker-compose down

Expected Output:
·   	Two independent Django microservices running in separate containers
·   	JSON responses confirming service availability
Guide Questions:
1. 	How does Django support microservices development?
2. 	What advantages do containers provide for Django deployment?
3. 	How would you enable service-to-service communication?
4. 	How can this setup be scaled using Kubernetes?

