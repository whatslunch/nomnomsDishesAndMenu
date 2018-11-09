# Derived from official mysql image (our base image)
FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD=

ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes

EXPOSE 3306

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./schema.sql /docker-entrypoint-initdb.d/