# Image, the "operating system". This image contains preinstalled programs.
FROM alpine

# Dependencies, the "programs". The "apk" command is from alpine.
RUN apk add --update redis

# Start code
CMD ["redis-server"]
