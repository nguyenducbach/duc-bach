pipeline {
    agent any
    stages{
        stage('Clone') {
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/nguyenducbach/duc-bach.git'
            }
        }
        stage('Push Docker Hub') {
            steps {
                withDockerRegistry(credentialsId: 'docker', url:'') 
                {
                    sh label: '', script: 'docker build -t nguyenducbach29/ducbach .'
                    sh label: '', script: 'docker push nguyenducbach29/ducbach'
                }
            }
        }
    }
    post {
        always {
            mail bcc: '', body: 'docker', cc: '', from: '', replyTo: '', subject: 'test', to: 'bachnguyenduc4@gmail.com'
        }
    }
}
