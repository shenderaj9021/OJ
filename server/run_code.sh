#!/bin/bash

case "$LANGUAGE" in
  "python")
    python your_python_file.py
    ;;
  "cpp")
    g++ your_cpp_file.cpp -o output && ./output
    ;;
  "java")
    javac YourJavaFile.java && java YourJavaFile
    ;;
  *)
    echo "Unsupported language: $LANGUAGE"
    ;;
esac
