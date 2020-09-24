FROM unqdifi/covid-back-node:v2

ENV NODE_ENV=production

WORKDIR /opt/app

COPY recreate-db.sh /opt/app/
RUN chmod +x /opt/app/recreate-db.sh

CMD ["bash", "/opt/app/recreate-db.sh"]
