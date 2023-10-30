# # Use an official Python runtime as a parent image
# FROM python:3.8

# # Set the working directory in the container
# WORKDIR /app

# # Copy the current directory contents into the container at /app
# COPY . /app

# # Run the Python script when the container starts
# CMD ["python", "test.py"]
# Use a base image with essential tools
FROM ubuntu:20.04

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install required software and dependencies
RUN apt-get install -y python 
RUN apt-get install -y g++


# Entry point for running code
CMD ["./run_code.sh"]
