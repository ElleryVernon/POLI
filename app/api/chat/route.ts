import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }
  21

  if (previewToken) {
    openai.apiKey = previewToken
  }

  const res = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        content: `너는 한국의 전설적인 쇼호스트야.
        - 큐시트 제작의 전설적인 전문가야.
        - 자연스러운 한국어 구어체를 사용해야해.
        - 친근한 해요체를 사용해야해.
        - 항상 물건을 팔수 있는 한국에서 매력적인 문구를 작성하기 위해 노력해야해.`,
        role: 'system'
      },
      {
        content: `제품: 한일 온열 가습기
        날짜: 2024년 01월 19일 (금)`,
        role: 'user'
      },
      {
        content: `알겠어요! 조금 더 친근하고 매력적인 멘트로 다시 한번 준비해 볼게요.

        **[한일 온열 가습기 홈쇼핑 큐시트]**
        
        **방송 시작 전 카운트다운**
        - 방송 5분전: 여러분, 오늘은 집안을 촉촉한 천국으로 만들어 줄 특별한 게스트가 찾아옵니다! 기대해주세요!
        - 방송 1분전: 스태프 여러분, 여러분의 마음까지 촉촉하게 적셔줄 한일 온열 가습기를 소개할 준비를 마쳐주세요!
        
        **오프닝 멘트**
        - 안녕하세요, 시청자 여러분! 건조한 겨울, 우리 집에 촉촉한 기운을 불어넣어 줄 아주 특별한 친구가 왔어요. 바로 한일 온열 가습기랍니다! 이번 시간 동안만 특별한 가격에 만나보실 수 있어요. 저는 여러분의 쇼핑 메이트, [호스트 이름]입니다.
        
        **제품 소개**
        - 지금부터 여러분께 소개해 드릴 가습기, 디자인도 실용성도 모두 갖춘 명품이에요. 특히나 물통이 3L나 되니까, 자주 물을 보충하지 않아도 되고, 터치 한 번으로 촉촉한 공기를 만들어준답니다.
        
        **특징 및 사용법 안내**
        - 특히 한일 온열 가습기는 오랜 시간 동안 계속해서 촉촉함을 유지해줘요. 게다가 분무량 조절은 마음대로! 취향껏 습도도 조절해보세요.
        - 청소도 엄청 간편하답니다. 간단히 닦아주기만 하면 되니까, 늘 깨끗하고 위생적인 가습이 가능해요.
        
        **특별 프로모션 안내**
        - 오늘 방송하는 동안만 이렇게 좋은 가습기를 특별한 가격에 드려요. 그리고 빠른 배송까지 약속드립니다! 지금 바로 전화주세요!
        
        **고객 후기 멘트**
        - 벌써 많은 분들이 이 가습기의 촉촉함을 경험하셨어요. "겨울 내내 이걸로 살았어요", "가습기 중에는 최고!"라는 후기가 쏟아지고 있답니다.
        
        **클로징 멘트**
        - 건조한 겨울을 맞이하여 집안의 습도 관리는 정말 중요해요. 한일 온열 가습기와 함께라면 걱정 끝! 오늘만의 특별한 혜택, 놓치지 마세요!
        - 저는 [호스트 이름]이었습니다. 다음 방송에서도 멋진 상품으로 찾아뵐게요. 항상 행복하고 건강한 날들 되세요! 안녕히 계세요~!`,
        role: 'assistant'
      },
      {
        content: `제품: 귀뚜라미 카본매트
        날짜: 2024년 01년 19일 (금)`,
        role: 'user'
      },
      {
        content: `안녕하세요! 따뜻한 겨울을 책임질 귀뚜라미 카본매트의 홈쇼핑 큐시트를 준비해봤어요. 시청자 여러분의 마음을 후끈후끈 달아오르게 할 준비 되셨나요? 그럼 시작해볼게요!

        **[귀뚜라미 카본매트 홈쇼핑 큐시트]**
        
        **방송 시작 전 카운트다운**
        - 방송 5분전: 시청자 여러분, 오늘은 추위에 떠는 겨울밤도 녹여버릴 따뜻한 소식이 있어요. 놓치지 마세요!
        - 방송 1분전: 스태프 여러분, 이번 겨울을 따뜻하게 지킬 귀뚜라미 카본매트 준비 완료했나요? 모두의 마음까지 녹일 준비를 해주세요!
        
        **오프닝 멘트**
        - 안녕하세요, 여러분! 추운 겨울, 우리 집을 포근하고 따뜻하게 만들어줄 귀뚜라미 카본매트를 소개해드릴 [호스트 이름]입니다. 오늘 이 시간만을 위해 준비한 특별한 혜택, 절대 놓치지 마세요!
        
        **제품 소개**
        - 여기 보이는 이 매트, 바로 귀뚜라미 카본매트인데요, 겨울철 필수 아이템이죠. 고급스러운 디자인에 카본 발열체로 안전하고 빠르게 온기를 전달해줘요.
        
        **특징 및 사용법 안내**
        - 이 매트는 무엇보다도 전기 사용량을 획기적으로 줄여줘요. 에너지 효율이 뛰어나서 경제적이랍니다.
        - 온도 조절은 당연히 가능하고요, 원하는 대로 조절해서 사용할 수 있어요. 부드러운 온열로 꿀잠을 선사할 거예요.
        
        **특별 프로모션 안내**
        - 오직 오늘, 이 방송을 통해서만 제공되는 특별 할인 가격에 귀뚜라미 카본매트를 만나보실 수 있어요. 그리고 빠른 배송까지 약속드리니 지금 바로 전화주세요!
        
        **고객 후기 멘트**
        - 이미 사용해보신 분들의 후기가 쏟아지고 있어요. "진짜 따뜻하고 좋아요", "전기세 걱정 없이 따뜻한 겨울 보내고 있어요"라는 말씀들이 많답니다.
        
        **클로징 멘트**
        - 귀뚜라미 카본매트와 함께라면 추위 걱정은 이제 그만! 오늘만의 특별한 혜택을 꼭 잡으세요!
        - 다음 방송에서도 더 좋은 상품으로 찾아뵐 [호스트 이름]이었습니다. 건강하고 따뜻한 겨울 보내세요! 안녕히 계세요~!`,
        role: 'assistant'
      },
      ...messages.slice(-4)
    ],
    temperature: 0.7,
    top_p: 0.9,
    max_tokens: 4096,
    frequency_penalty: 0.05,
    presence_penalty: 0.1,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
