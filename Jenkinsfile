
docker run -p 8080:8080 -p 50000:50000 --restart=on-failure 
jenkins/jenkins:lts
docker run -p 8080:8080 -p 50000:50000 --restart=on-failure -v
jenkins_home:/var/jenkins_home -d --name jenkins
jenkins/jenkins:lts
docker run -p 8080:8080 -p 50000:50000 --restart=on-failure -v jenkins_home:/var/jenkins_home -d --name jenkins jenkins/jenkins:lts
https://github.com/VanLeDinh96/nodejs-reactjs

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
