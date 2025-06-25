FROM python:3.11

# Set working directory
WORKDIR /app

# Copy pyproject.toml
COPY requirements.txt ./requirements.txt

# Install dependencies
RUN pip install -r requirements.txt

# Copy the entire project
COPY . ./

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "src.smartdocsearch:app", "--host", "0.0.0.0", "--port", "8000"]
