#!/bin/bash
cd /home/kavia/workspace/code-generation/chatease-ai-6051-6059/main_container_for_chatease_ai
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

