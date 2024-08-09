<script setup>
import { inject, ref, onMounted, nextTick } from 'vue';
import { marked } from 'marked'; // `marked` 라이브러리 임포트

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
  
  // 봇 메시지 객체 생성 및 추가
  const botMessage = {
    text: ref(''), // 반응성 있는 텍스트 속성
    sender: 'bot',
    date: new Date(),
    isStreaming: true
  };
  messages.value.push(botMessage);
  
  // API 호출 및 응답 스트리밍
  await streamResponse(messageText, botMessage);
};

const streamResponse = async (prompt, botMessage) => {
  const userId = 5; // 예시 사용자 ID
  const url = `https://t1115.p.ssafy.io/ai/prompt?user_id=${userId}&prompt=${encodeURIComponent(prompt)}`;
  
  try {
    const response = await fetch(url);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      // 응답 데이터에서 `data:` 문자열을 제거하고, 공백을 정리
      const chunk = decoder.decode(value);
      accumulatedText += cleanChunk(chunk);
      botMessage.text.value = accumulatedText; // 텍스트 업데이트
      botMessage.html = marked(accumulatedText); // 마크다운을 HTML로 변환
      await nextTick(); // Vue의 DOM 업데이트 대기
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


// 응답 데이터에서 `data:` 문자열을 제거하고, 공백을 정리하는 함수
const cleanChunk = (chunk) => {
  // `data:` 문자열 제거 및 불필요한 공백 제거
  const cleaned = chunk
    .replace(/data:\s*/g, '') // `data:` 문자열 제거
    .replace(/\s+/g, ' ') // 중복된 공백을 하나의 공백으로 변환
    .trim(); // 문자열의 시작과 끝 공백 제거
  
  return cleaned;
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
              <!-- {{ message.text }} -->
              <span v-if="message.isStreaming">...</span>
              <div v-else v-html="message.html"></div>
              <div v-if="message.suggestions" class="suggestion-buttons">
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
  height: 70px;
  padding: 10px;
  background-color: #f8f9fa;
}

.chat-input input {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 10px;
  font-size: 15px;
}

.suggestion-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
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

