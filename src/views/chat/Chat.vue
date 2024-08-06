
<script setup>
import { inject, ref, onMounted, nextTick } from 'vue';

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
  
  simulateBotResponse(messageText);
};

const simulateBotResponse = async (userMessage) => {
  let botResponse = '';

  switch (userMessage) {
    case "이번달 소비에대해 분석해줘":
      botResponse = "이번 달 소비를 분석해보니, 식비가 가장 큰 비중을 차지하고 있습니다. 지난달에 비해 10% 증가했네요.";
      break;
    case "이번달 주거비는 얼마야?":
      botResponse = "이번 달 주거비는 총 80만원입니다. 여기에는 월세, 관리비, 공과금이 포함되어 있습니다.";
      break;
    case "어디에 가장 많이 지출했어?":
      botResponse = "이번 달 가장 많이 지출한 카테고리는 '식비'입니다. 전체 지출의 약 30%를 차지했네요.";
      break;
    case "나한테 맞는 카드 추천해줘":
      botResponse = "사용 패턴을 분석해본 결과, 식비와 대중교통 혜택이 좋은 'A카드'가 적합해 보입니다.";
      break;
    default:
      botResponse = "죄송합니다. 해당 질문에 대한 답변을 준비 중입니다.";
  }

  setTimeout(async () => {
    const botMessage = {
      text: botResponse,
      sender: 'bot',
      date: new Date()
    };
    messages.value.push(botMessage);
    await nextTick();
    scrollToBottom();
  }, 1000);
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
              {{ message.text }}
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

