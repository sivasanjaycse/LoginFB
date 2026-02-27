pipeline {
    agent any

    stages {

        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('frontEnd') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontEnd') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh 'sudo rm -rf /var/www/html/*'
                sh 'sudo cp -r frontEnd/dist/* /var/www/html/'
            }
        }

        stage('Restart Backend') {
            steps {
                sh 'pm2 restart loginfb-backend'
            }
        }
    }
}
