pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        EMAIL_CREDENTIALS_ID = 'gmail-credentials'
        BRANCH_NAME = 'main'
        DOCKERHUB_REPO = 'vanle96'
        API_IMAGE = 'api-image'
        UI_IMAGE = 'ui-image'
        RECIPIENTS = 'dinhvanle.it@gmail.com'
        SSH_CREDENTIALS_ID = 'my-ssh-creds'
        SSH_HOST = 'ec2-13-213-3-47.ap-southeast-1.compute.amazonaws.com'
        SSH_USER = 'ec2-user'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/VanLeDinh96/nodejs-reactjs.git'
            }
            post {
                success {
                    mail(
                        bcc: '',
                        body: """Checkout successfully.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
                failure {
                    mail(
                        bcc: '',
                        body: """Checkout failed.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        echo 'Logged in to Docker Hub'
                        echo 'test'
                    }
                }
            }
            post {
                success {
                    mail(
                        bcc: '',
                        body: """Login to Dockerhub successfully.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
                failure {
                    mail(
                        bcc: '',
                        body: """Login to Dockerhub failed.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
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
            post {
                success {
                    mail(
                        bcc: '',
                        body: """Check and Delete API Docker Image successfully.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
                failure {
                    mail(
                        bcc: '',
                        body: """Check and Delete API Docker Image failed.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
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
            post {
                success {
                    mail(
                        bcc: '',
                        body: """Build and Push API Docker Image successfully.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
                failure {
                    mail(
                        bcc: '',
                        body: """Build and Push API Docker Image failed.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
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
            post {
                success {
                    mail(
                        bcc: '',
                        body: """Check and Delete UI Docker Image successfully.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
                failure {
                    mail(
                        bcc: '',
                        body: """Check and Delete UI Docker Image failed.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
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
            post {
                success {
                    mail(
                        bcc: '',
                        body: """Build and Push UI Docker successfully.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
                failure {
                    mail(
                        bcc: '',
                        body: """Build and Push UI Docker failed.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent (credentials: [SSH_CREDENTIALS_ID]) {
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} 'docker-compose down && docker-compose up -d'"
                }
            }
            post {
                success {
                    mail(
                        bcc: '',
                        body: """Deploy successfully.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
                failure {
                    mail(
                        bcc: '',
                        body: """Deploy failed.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
            }
        }

        stage('Notify') {
            steps {
                always {
                    mail (
                        bcc: '',
                        body: """Build successfully.
                        Job name: ${env.JOB_NAME}
                        Build number: ${env.BUILD_NUMBER}
                        Current result: ${currentBuild.currentResult}
                        Detail: ${env.BUILD_URL}""",
                        cc: '',
                        from: '',
                        replyTo: '',
                        subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        to: RECIPIENTS
                    )
                }
                
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
