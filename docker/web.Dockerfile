FROM node:20-bullseye

WORKDIR /workspace

RUN corepack enable

EXPOSE 5173
