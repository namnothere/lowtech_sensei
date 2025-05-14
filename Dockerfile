FROM oven/bun:1

WORKDIR /app

# Create dist directory
RUN mkdir -p dist

# Expose the port (assuming default port 3000, adjust if needed)
EXPOSE 3000

# Command to run the server
CMD ["bun", "run", "serve", "dist"] 