pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        EMAIL_CREDENTIALS_ID = 'gmail-credentials'
        BRANCH_NAME = 'main'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/VanLeDinh96/nodejs-reactjs.git'
            }
        }

        stage('Build API Docker Image') {
            steps {
                script {
                    dir('api') {
                        sh 'docker build -t vanle96/tutorial-api:latest .'
                    }
                }
            }
        }

        stage('Build UI Docker Image') {
            steps {
                script {
                    dir('ui') {
                        sh 'docker build -t vanle96/tutorial-ui:latest .'
                    }
                }
            }
        }

        stage('Push API Docker Image') {
            steps {
                script {
                    docker.withRegistry(credentialsId: 'dockerhub-credentials', url: '') {
                        sh 'docker push vanle96/tutorial-api:latest'
                    }
                }
            }
        }
        stage('Push UI Docker Image') {
            steps {
                script {
                    docker.withRegistry(credentialsId: 'dockerhub-credentials', url: '') {
                        sh 'docker push vanle96/tutorial-ui:latest'
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
