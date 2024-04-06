# infrafy

This is a simple repo to learn in public on how to use Terraform and Kubernetes and connect these technologies with my already known knowledge in AWS and Docker.

Thanks to [NLW Unite](https://www.rocketseat.com.br/eventos/nlw) free event for the inspiration and guide to create this project.

## Thought process

The first layer of the project is the web application. It consists in a simple web application made with [fastify](https://fastify.dev/docs/latest/Guides/Getting-Started/) and [Prisma](https://www.prisma.io/docs/getting-started). This application uses a PostgreSQL database to store and retrieve dummy data.

After that, we added a second layer with Docker. This layer is responsible for creating a production-ready image of the web application build and push it to Dockerhub. By the side of Docker image, we also use Docker Compose to make it easier to run the application locally using the built image.

The third one is the Terraform & Kubernetes layer. We use Terraform to create the database in [AWS Relational Database Service](https://aws.amazon.com/rds/?nc1=h_ls) (RDS) and apply it to the Kubernets cluster.

We could expand this project by using Helm to manage the Kubernetes resources and also deploy it using Terraform to [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/?nc1=h_ls) (AWS EKS).

## How to run

### Without Docker

Set the `.env` file using `.env.example`. To run the application without Docker, make sure you have [pnpm](https://pnpm.io/installation) installed. Run:

```bash
pnpm install
pnpm run dev
```

### With Docker

Make sure you have Docker and Docker Compose both installed. Run:

```bash
docker-compose up
```

### Run inside a Kubernetes cluster pulling the image from Dockerhub

To spin up the application from my Dockerhub inside your cluster, make sure you have one cluster locally running. To create a cluster locally I have used [k3d](https://k3d.io/v5.6.0/#installation). Also make sure you have [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl) installed and configured.

Change the `k8s/secret.yaml` file with your own pSQL connection string. If you want, you can configure your RDS database using my Terraform script. Refer to [this section](#leveraging-a-postgresql-database-on-aws-using-terraform) for more information.

```bash
cd infrafy
kubectl create ns infrafy
kubectl apply -f k8s
```

This should create the deployment and service for the application. To access the application, you can run:

```bash
kubectl port-forward svc/infrafy 8080:8080 -n infrafy
```

### Create your own PostgreSQL database on AWS using Terraform

Make sure you have [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) installed. Create a `terraform.tfvars` in `terraform` folder with the following content:

```hcl
aws_access_key = "your-aws-access-key"
aws_secret_key = "your-aws-secret-key"
postgres_username = "postgres-username"
postgres_password = "postgres-password"
postgres_db_name = "postgres-db-name"
```

You can also customize the `terraform/variables.tf` and `terraform/main.tf` files to create dynamically this resource. This is probably the best approach for a production-ready application, but works if you want just to prototype something and spin up a database quickly. After this, run:

```bash
cde terraform
terraform init
terraform apply
```

## Forking this project

Feel free to fork this project and use it as a base for your own learning. Just make sure you update every reference to my Dockerhub images to yours (on both k8s and `.github/workflows/ci.yml`)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
