pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        EMAIL_CREDENTIALS_ID = 'gmail-credentials'
        BRANCH_NAME = 'main'
        DOCKERHUB_REPO = 'vanle96'
        API_IMAGE = 'api-image'
        UI_IMAGE = 'ui-image'
        SENDER = 'yamatole312@gmail.com'
        RECIPIENTS = 'dinhvanle.it@gmail.com'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/VanLeDinh96/nodejs-reactjs.git'
            }
            post {
                always {
                    mail bcc: '', 
                        body: "Checkout successfully.\n\n" +
                            "Job name: ${env.JOB_NAME}\n" +
                            "Build number: ${env.BUILD_NUMBER}\n" +
                            "Current result: ${currentBuild.currentResult}\n" +
                            "Detail: ${env.BUILD_URL}",
                        cc: '', 
                        from: '', 
                        replyTo: '', 
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}", 
                        to: RECIPIENTS
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        echo 'Logged in to Docker Hub'
                    }
                }
            }
            // post {
            //     success {
            //         emailext(
            //             subject: "Docker Hub Login Success",
            //             body: "Logged in to Docker Hub successfully.",
            //             from: SENDER,
            //             to: RECIPIENTS
            //         )
            //     }
            //     failure {
            //         emailext(
            //             subject: "Docker Hub Login Failed",
            //             body: "Failed to log in to Docker Hub. Please check the logs.",
            //             from: SENDER,
            //             to: RECIPIENTS
            //         )
            //     }
            // }
        }

        stage('Check and Delete API Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        def imageExists = sh(
                            script: "curl -s -u $DOCKERHUB_USERNAME:$DOCKERHUB_PASSWORD https://hub.docker.com/v2/repositories/$DOCKERHUB_REPO/$API_IMAGE/tags/latest/",
                            returnStatus: true
                        ) == 0
                        if (imageExists) {
                            sh "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
                            sh "docker rmi $DOCKERHUB_REPO/$API_IMAGE:latest || true"
                            sh "docker pull $DOCKERHUB_REPO/$API_IMAGE:latest || true"
                            sh "docker rmi $DOCKERHUB_REPO/$API_IMAGE:latest"
                            echo "Deleted existing API image"
                        } else {
                            echo "API image does not exist"
                        }
                    }
                }
            }
            // post {
            //     success {
            //         emailext(
            //             subject: "API Image Check and Delete Success",
            //             body: "The API Docker image check and delete stage completed successfully.",
            //             from: SENDER,
            //             to: RECIPIENTS
            //         )
            //     }
            //     failure {
            //         emailext(
            //             subject: "API Image Check and Delete Failed",
            //             body: "The API Docker image check and delete stage failed. Please check the logs.",
            //             from: SENDER,
            //             to: RECIPIENTS
            //         )
            //     }
            // }
        }

        stage('Build and Push API Docker Image') {
            steps {
                script {
                    dir('api') {
                        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                            sh """
                            docker build -t $DOCKERHUB_REPO/$API_IMAGE:latest .
                            echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin
                            docker push $DOCKERHUB_REPO/$API_IMAGE:latest
                            """
                        }
                    }
                }
            }
            // post {
            //     success {
            //         emailext(
            //             subject: "API Docker Image Build and Push Success",
            //             body: "The API Docker image was built and pushed successfully.",
            //             from: SENDER,
            //             to: RECIPIENTS
            //         )
            //     }
            //     failure {
            //         emailext(
            //             subject: "API Docker Image Build and Push Failed",
            //             body: "The API Docker image build and push stage failed. Please check the logs.",
            //             from: SENDER,
            //             to: RECIPIENTS
            //         )
            //     }
            // }
        }

        stage('Check and Delete UI Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        def imageExists = sh(
                            script: "curl -s -u $DOCKERHUB_USERNAME:$DOCKERHUB_PASSWORD https://hub.docker.com/v2/repositories/$DOCKERHUB_REPO/$UI_IMAGE/tags/latest/",
                            returnStatus: true
                        ) == 0
                        if (imageExists) {
                            sh "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
                            sh "docker rmi $DOCKERHUB_REPO/$UI_IMAGE:latest || true"
                            sh "docker pull $DOCKERHUB_REPO/$UI_IMAGE:latest || true"
                            sh "docker rmi $DOCKERHUB_REPO/$UI_IMAGE:latest"
                            echo "Deleted existing UI image"
                        } else {
                            echo "UI image does not exist"
                        }
                    }
                }
            }
            // post {
            //     success {
            //         emailext(
            //             subject: "UI Image Check and Delete Success",
            //             body: "The UI Docker image check and delete stage completed successfully.",
            //             from: SENDER,
            //             to: RECIPIENTS
            //         )
            //     }
            //     failure {
            //         emailext(
            //             subject: "UI Image Check and Delete Failed",
            //             body: "The UI Docker image check and delete stage failed. Please check the logs.",
            //             from: SENDER,
            //             to: RECIPIENTS
            //         )
            //     }
            // }
        }

        stage('Build and Push UI Docker Image') {
            steps {
                script {
                    dir('ui') {
                        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                            sh """
                            docker build -t $DOCKERHUB_REPO/$UI_IMAGE:latest .
                            echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin
                            docker push $DOCKERHUB_REPO/$UI_IMAGE:latest
                            """
                        }
                    }
                }
            }
            // post {
            //     success {
            //         emailext(
            //             subject: "UI Docker Image Build and Push Success",
            //             body: "The UI Docker image was built and pushed successfully.",
            //             from: SENDER,
            //             to: RECIPIENTS
            //         )
            //     }
            //     failure {
            //         emailext(
            //             subject: "UI Docker Image Build and Push Failed",
            //             body: "The UI Docker image build and push stage failed. Please check the logs.",
            //             from: SENDER,
            //             to: RECIPIENTS
            //         )
            //     }
            // }
        }

        stage('Notify') {
            steps {
                emailext (
                    subject: "Build ${currentBuild.fullDisplayName} - ${currentBuild.currentResult}",
                    body: "Build ${currentBuild.fullDisplayName} finished with status: ${currentBuild.currentResult}. Check console output at ${env.BUILD_URL} to view the results.",
                    from: SENDER,
                    to: RECIPIENTS
                )
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
