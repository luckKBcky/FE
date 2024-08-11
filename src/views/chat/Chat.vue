<script setup>
import { inject, ref, onMounted, nextTick } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const pageTitle = inject('pageTitle');
const chatMessages = ref(null);
const newMessage = ref('');
const messages = ref([
  { 
    text: '안녕하세요! 무엇을 도와드릴까요?', 
    sender: 'bot', 
    date: new Date(),
    suggestions: [
      "이번달 소비에대해 분석해줘",
      "이번달 주거비는 얼마야?",
      "어디에 가장 많이 지출했어?",
      "나한테 맞는 카드 추천해줘"
    ]
  },
]);

const sendMessage = async (message = null) => {
  const messageText = message || newMessage.value.trim();
  if (messageText === '') return;
  
  const userMessage = {
    text: messageText,
    sender: 'user',
    date: new Date()
  };
  messages.value.push(userMessage);
  newMessage.value = '';
  
  await nextTick();
  scrollToBottom();
  
  const botMessage = {
    text: ref(''),
    sender: 'bot',
    date: new Date(),
    isStreaming: true,
    html: ref('')
  };
  messages.value.push(botMessage);
  
  await streamResponse(messageText, botMessage);
};

const streamResponse = async (prompt, botMessage) => {
  const userId = 5;
  const url = `https://t1115.p.ssafy.io/ai/prompt?user_id=${userId}&prompt=${encodeURIComponent(prompt)}`;
  
  try {
    const response = await fetch(url);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';
    let firstChunk  = true;
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if(firstChunk) {
        firstChunk = false;
        continue;
      }
      
      const chunk = cleanChunk(decoder.decode(value));
      accumulatedText += chunk;
      botMessage.text.value = accumulatedText;
      botMessage.html.value = formatTextForHtml(accumulatedText);
      await nextTick();
      scrollToBottom();
    }
  } catch (error) {
    console.error('Error:', error);
    botMessage.text.value = '죄송합니다. 오류가 발생했습니다.';
  } finally {
    botMessage.isStreaming = false;
    await nextTick();
    scrollToBottom();
  }
};

const cleanChunk = (chunk) => {
  if (!chunk.includes('data:')) {
    return ''; // "data: "를 포함하지 않으면 빈 문자열 반환
  }
  const cleaned = chunk.replace(/data: /g, '').trimEnd();
  return (cleaned === '') ? '\n' : cleaned;
};

const formatTextForHtml = (text) => {
  let htmlText = text.replace(/\*\*(.*?)\*\*/g, '<span class="highlight">$1</span>');
  htmlText = htmlText.replace(/\n/g, '<br>');
  if (text.endsWith('...')) {
    htmlText += '<span>...</span>';
  }
  
  return DOMPurify.sanitize(htmlText);
};

const scrollToBottom = () => {
  if (chatMessages.value) {
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
  }
};

const showDateDivider = (index) => {
  if (index === 0) return true;
  const prevDate = messages.value[index - 1].date;
  const currentDate = messages.value[index].date;
  return !isSameDay(prevDate, currentDate);
};

const isSameDay = (date1, date2) => {
  return date1.toDateString() === date2.toDateString();
};

const formatDate = (date) => {
  return date.toLocaleDateString('ko-KR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

onMounted(() => {
  pageTitle.value = '챗봇상담';
  scrollToBottom();
});
</script>


<template>
  <div class="chat-container">
    <div class="chat-messages" ref="chatMessages">
      <div v-for="(message, index) in messages" :key="index">
        <div v-if="showDateDivider(index)" class="date-divider">
          <span>{{ formatDate(message.date) }}</span>
        </div>
        <div :class="['message', message.sender]">
          <div class="message-bubble">
            <template v-if="message.sender === 'user'">
              {{ message.text }}
            </template>
            <template v-else>
              <div v-if="message.isStreaming" v-html="message.html.replace(/\n/g, '<br>') + '<span>...</span>'"></div>
              <!-- <div v-if="message.isStreaming">{{ message.text }}<span>...</span></div> -->
              <!-- <div v-else v-html="message.html"></div> -->
            </template>
            <div v-if="message.suggestions" class="suggestion-buttons">
              <p>{{ message.text }}</p>
              <button 
                v-for="suggestion in message.suggestions" 
                :key="suggestion"
                @click="sendMessage(suggestion)"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <button class="add-button" @click="onAddClick"><font-awesome-icon :icon="['fas', 'plus']" size="xl" style="color: #ffffff;" /></button>
      <input 
        v-model="newMessage" 
        @keyup.enter="sendMessage()" 
        placeholder="메시지를 입력하세요..."
      />
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
  background-color: #FBF8E9;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  margin-bottom: 20px;
  display: flex;
}

.message-bubble {
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 70%;
}

.user {
  justify-content: flex-end;
}

.user .message-bubble {
  background-color: #F9D759;
  color: #000000;
}

.bot {
  justify-content: flex-start;
}

.bot .message-bubble {
  background-color: #ffffff;
  color: black;
}

.date-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0px 0px 20px 0px;
  color: #5A5A5A;
}

.date-divider::before,
.date-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px dashed #5A5A5A;
}

.date-divider span {
  padding: 0 10px;
  font-size: 0.8em;
}

.chat-input {
  display: flex;
  align-items: center;
  height: 60px;
  /* padding: 5px; */
}

.add-button {
  flex: 0.7;
  background-color: #64635E;
  border: none;
  height: 100%;
  font-size: 20px;
}

.chat-input input {
  flex: 4;
  height: 100%;
  padding: 10px;
  border-top: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
  border-left: none;
  border-right: none;
  font-size: 15px;
}

.suggestion-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.suggestion-buttons p{
  color: #3d3d3d;
}

.suggestion-buttons button {
  border: none;
  width: 100%;
  padding: 10px 15px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.9em;
}
</style>

