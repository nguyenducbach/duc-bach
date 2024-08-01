pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        EMAIL_CREDENTIALS_ID = 'gmail-credentials'
        BRANCH_NAME = 'main'
        DOCKERHUB_REPO = 'vanle96'
        API_IMAGE = 'api-image'
        UI_IMAGE = 'ui-image'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/VanLeDinh96/nodejs-reactjs.git'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        echo 'Logged in to Docker Hub'
                        echo 'Test'
                    }
                }
            }
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
        }

        // stage('Push') {
        //     steps {
        //         script {
        //             docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
        //                 docker.image("${DOCKERHUB_REPO}:latest").push()
        //             }
        //         }
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         sh 'docker-compose down'
        //         sh 'docker-compose up -d'
        //     }
        // }

        // stage('Notify') {
        //     steps {
        //         emailext (
        //             subject: "Build ${currentBuild.fullDisplayName} - ${currentBuild.currentResult}",
        //             body: "Build ${currentBuild.fullDisplayName} finished with status: ${currentBuild.currentResult}. Check console output at ${env.BUILD_URL} to view the results.",
        //             recipientProviders: [[$class: 'DevelopersRecipientProvider']],
        //             from: 'yamatole312@gmail.com',
        //             to: 'dinhvanle.it@gmail.com'
        //         )
        //     }
        // }
    }

    post {
        always {
            cleanWs()
        }
    }
}
