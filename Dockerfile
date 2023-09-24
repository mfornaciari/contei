FROM oven/bun:1.0.3
WORKDIR /app

ARG USER=1000
COPY user_setup.sh .
RUN chmod +x user_setup.sh
RUN ./user_setup.sh
USER $USER
