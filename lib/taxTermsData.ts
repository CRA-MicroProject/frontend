import type { TaxTermRecord } from "@/lib/types";

export const TAX_TERMS: TaxTermRecord[] = [
  {
    id: "1",
    term: {
      en: "Income Tax",
      mn: "Орлогын татвар",
      pt: "Imposto de Renda",
    },
    definition: {
      en: "A tax levied on the annual income of individuals and businesses by the government.",
      mn: "Засаг захиргаанаас хувь хүн, байгууллагын жилийн орлогод ногдуулдаг татвар.",
      pt: "Imposto cobrado pelo governo sobre a renda anual de pessoas físicas e jurídicas.",
    },
    plainLanguage: {
      en: "You pay tax on the money you earn over the year. The government uses this to fund public services.",
      mn: "Та жилд олсон мөнгөнөөс татвар төлнө. Засгийн газар үүнийг олон нийтийн үйлчилгээнд ашигладаг.",
      pt: "Você paga imposto sobre o dinheiro que ganha durante o ano. O governo usa isso para financiar serviços públicos.",
    },
    whyItMatters: {
      en: "Your tax rate and allowances depend on your income level. Knowing how it works helps you plan and avoid under or over-paying.",
      mn: "Таны татварын хувь хэмжээ болон хөнгөлөлт орлогын түвшиндээ хамаарна. Үүнийг ойлгоход төлөвлөлт хийж, бага эсвэл их төлөхөөс сэргийлнэ.",
      pt: "Sua alíquota e deduções dependem do seu nível de renda. Entender como funciona ajuda a planejar e evitar pagar a mais ou a menos.",
    },
    example: {
      en: "A salaried employee pays income tax on their wages; a freelancer pays it on their business profits.",
      mn: "Цалинтай ажилтан цалингаасаа орлогын татвар төлнө; бие даан ажиллагсад бизнесийн ашгаасаа төлнө.",
      pt: "Um assalariado paga imposto de renda sobre o salário; um freelancer paga sobre o lucro do negócio.",
    },
    actionTip: {
      en: "Keep records of all income and any allowable deductions so you can file accurately and on time.",
      mn: "Бүх орлого болон зөвшөөрөгдөх хөнгөлөлтийг бүртгэж байгаарай, ингэснээр үнэн зөв, цаг дуусахаас нь өмнө татвараа төлнө.",
      pt: "Mantenha registros de toda a renda e deduções permitidas para declarar com precisão e no prazo.",
    },
  },
  {
    id: "2",
    term: {
      en: "VAT",
      mn: "НӨАТ",
      pt: "IVA",
    },
    definition: {
      en: "Value Added Tax: a consumption tax placed on a product at each stage of the supply chain.",
      mn: "Нэмэгдсэн өртгийн албан татвар: бүтээгдэхүүний нийлүүлэлтийн үе бүрт ногдуулдаг хэрэглээний татвар.",
      pt: "Imposto sobre o Valor Agregado: imposto sobre consumo aplicado ao produto em cada etapa da cadeia de suprimentos.",
    },
    plainLanguage: {
      en: "A percentage added to the price of most goods and services. Each business in the chain charges it and passes it on to the tax authority.",
      mn: "Ихэнх бараа, үйлчилгээний үнэд нэмэгддэг хувь. Цуврал дахь бизнес бүр үүнийг нэмж, татварын байгууллагад шилжүүлдэг.",
      pt: "Uma porcentagem adicionada ao preço da maioria dos bens e serviços. Cada negócio na cadeia cobra e repassa à autoridade fiscal.",
    },
    whyItMatters: {
      en: "If you are VAT-registered you must charge it on sales and can reclaim it on eligible purchases. It affects your pricing and cash flow.",
      mn: "НӨАТ-д бүртгүүлсэн бол борлуулалтаас нэмж авах, зөвшөөрөгдөх худалдан авалтаас буцааж авах эрхтэй. Үнэ болон мөнгөний урсгалд нөлөөлнө.",
      pt: "Se você é registrado no IVA, deve cobrá-lo nas vendas e pode recuperá-lo em compras elegíveis. Afeta preços e fluxo de caixa.",
    },
    example: {
      en: "A café charges VAT on coffee; it pays VAT on the beans it buys and sends the difference to the tax office.",
      mn: "Кофе шөнийн газар кофены үнэнд НӨАТ нэмнэ; худалдаж авсан буудсын НӨАТ төлж, зөрүүг татварын байгууллагад илгээнэ.",
      pt: "Um café cobra IVA no café; paga IVA nos grãos que compra e envia a diferença à fazenda.",
    },
    actionTip: {
      en: "Check whether your turnover requires VAT registration and file returns by the deadline to avoid penalties.",
      mn: "Эргэлтийн хэмжээ НӨАТ-д бүртгүүлэхийг шаардаж байгаа эсэх, эцсийн хугацааг дутуулахгүй байж торгуульд орохоос сэргийл.",
      pt: "Verifique se seu faturamento exige registro de IVA e entregue as declarações no prazo para evitar multas.",
    },
  },
  {
    id: "3",
    term: {
      en: "Deduction",
      mn: "Хөнгөлөлт",
      pt: "Dedução",
    },
    definition: {
      en: "An amount subtracted from gross income when calculating taxable income.",
      mn: "Татварлагдах орлогыг тооцохдоо нийт орлогоос хасагдах дүн.",
      pt: "Valor subtraído da renda bruta no cálculo da renda tributável.",
    },
    plainLanguage: {
      en: "Expenses or allowances the tax rules let you subtract from your income before tax is calculated, so you pay less.",
      mn: "Татвар тооцохоос өмнө орлогоосоо хасахыг татварын дүрэм зөвшөөрдөг зарлага эсвэл хөнгөлөлт тул та бага төлнө.",
      pt: "Despesas ou deduções que as regras fiscais permitem subtrair da sua renda antes de calcular o imposto, para você pagar menos.",
    },
    whyItMatters: {
      en: "Claiming valid deductions lowers your tax bill. Missing them means you overpay; claiming invalid ones can lead to penalties.",
      mn: "Зөв хөнгөлөлт авахад татварын төлбөр буурна. Алдахад илүү төлнө; буруу авахад торгууль ноцтой болно.",
      pt: "Reclamar deduções válidas reduz seu imposto. Deixar de reclamar faz você pagar a mais; reclamar inválidas pode gerar multas.",
    },
    example: {
      en: "A self-employed consultant deducts home office costs and travel to clients from their business income.",
      mn: "Өөртөө ажиллагсад зөвлөх нь гэрээс ажиллах зардал, үйлчлүүлэгч рүү явах зардлыг бизнесийн орлогоосоо хасдаг.",
      pt: "Um consultor autônomo deduz custos de home office e viagens a clientes da renda do negócio.",
    },
    actionTip: {
      en: "Keep receipts and records for every deduction you claim in case the tax authority asks for proof.",
      mn: "Татварын байгууллага нотлох баримт асуухад бэлтгэхийн тулд авах хөнгөлөлт бүрийн баримт, бүртгэл хадгална уу.",
      pt: "Guarde recibos e registros de cada dedução que reclamar caso a autoridade fiscal peça comprovação.",
    },
  },
  {
    id: "4",
    term: {
      en: "Taxable Income",
      mn: "Татвартай орлого",
      pt: "Renda Tributável",
    },
    definition: {
      en: "The portion of income used to calculate how much tax an individual or entity owes.",
      mn: "Хувь хүн эсвэл байгууллага хэдэн татвар төлөх ёстойг тооцоход ашигладаг орлогын хэсэг.",
      pt: "A parcela da renda usada para calcular quanto imposto um indivíduo ou entidade deve.",
    },
    plainLanguage: {
      en: "What’s left of your income after allowed deductions and exemptions. Tax is calculated on this amount, not on your full earnings.",
      mn: "Зөвшөөрөгдөх хөнгөлөлт, чөлөөлөлтийн дараа үлдсэн орлогын хэсэг. Татварыг энэ дүнгээр тооцно, бүх орлогод биш.",
      pt: "O que sobra da sua renda após deduções e isenções permitidas. O imposto é calculado sobre esse valor, não sobre o total ganho.",
    },
    whyItMatters: {
      en: "Only taxable income is subject to tax. Knowing how it’s calculated helps you use allowances and plan your finances.",
      mn: "Зөвхөн татвартай орлогод татвар ногдуулна. Үүнийг хэрхэн тооцдогийг мэдэх нь хөнгөлөлт ашиглах, санхүүгээ төлөвлөхөд тусална.",
      pt: "Apenas a renda tributável está sujeita a imposto. Saber como é calculada ajuda a usar deduções e planejar suas finanças.",
    },
    example: {
      en: "If you earn $50,000 and have $10,000 in deductions, your taxable income is $40,000.",
      mn: "Хэрэв та 50,000 доллар олж, 10,000 долларын хөнгөлөлттэй бол татвартай орлого та 40,000 доллар.",
      pt: "Se você ganha R$ 50.000 e tem R$ 10.000 em deduções, sua renda tributável é R$ 40.000.",
    },
    actionTip: {
      en: "Review which income is taxable and which deductions apply to you before filing your return.",
      mn: "Татварын тайлангаа өгөхөөс өмнө аль орлого татвартай, ямар хөнгөлөлт танд хамааралтайг шалгана уу.",
      pt: "Revise qual renda é tributável e quais deduções se aplicam a você antes de declarar.",
    },
  },
  {
    id: "5",
    term: {
      en: "Withholding Tax",
      mn: "Суутгалтай татвар",
      pt: "Imposto na Fonte",
    },
    definition: {
      en: "Income tax withheld from wages or other payments and paid directly to the government.",
      mn: "Цалин эсвэл бусад төлбөрөөс урьдчилан суутгаж, засгийн газарт шууд төлөх орлогын татвар.",
      pt: "Imposto de renda retido dos salários ou outros pagamentos e pago diretamente ao governo.",
    },
    plainLanguage: {
      en: "Your employer or payer takes tax from your pay before you receive it and sends it to the tax authority on your behalf.",
      mn: "Ажил олгогч эсвэл төлөгч таны цалинг хүлээн авахаас өмнө татварыг суутгаж, таны төлөө татварын байгууллагад илгээнэ.",
      pt: "Seu empregador ou pagador retém o imposto do seu pagamento antes de você receber e envia à autoridade fiscal em seu nome.",
    },
    whyItMatters: {
      en: "It spreads your tax through the year and avoids a large bill at filing time. You may still need to file and could get a refund or owe more.",
      mn: "Татварыг жилийн турш тусгайлана, тайлангаа өгөх үед том төлбөр гаргахаас сэргийлнэ. Та тайлангаа өгөх хэрэгтэй хэвээр байж, буцаан авах эсвэл илүү төлөх боломжтой.",
      pt: "Distribui o imposto ao longo do ano e evita uma conta grande na declaração. Você ainda pode precisar declarar e ter restituição ou dever mais.",
    },
    example: {
      en: "A company pays you $3,000; after withholding tax of $600 you receive $2,400. The $600 is sent to the tax office.",
      mn: "Компани танд 3,000 доллар төлнө; 600 долларын суутгалтай татварын дараа та 2,400 доллар хүлээн авна. 600 долларыг татварын байгууллагад илгээнэ.",
      pt: "Uma empresa paga R$ 3.000; após retenção de R$ 600 você recebe R$ 2.400. Os R$ 600 são enviados à fazenda.",
    },
    actionTip: {
      en: "Check your payslips to see how much was withheld. If you have other income, you may need to make extra payments during the year.",
      mn: "Хэдэн төгрөг суутгасныг харахын тулд цалингийн хуудсаа шалгана уу. Өөр орлого байвал жилийн турш нэмэлт төлбөр хийх шаардлагатай болж магадгүй.",
      pt: "Confira seus contracheques para ver quanto foi retido. Se tiver outra renda, pode precisar fazer pagamentos extras durante o ano.",
    },
  },
  {
    id: "6",
    term: {
      en: "Freelance",
      mn: "Чөлөөт ажилтан",
      pt: "Freelancer",
    },
    alsoKnownAs: {
      en: "Self-employment / Business Income",
      mn: "Өөртөө ажиллагаа / Бизнесийн орлого",
      pt: "Trabalho autônomo / Renda de negócio",
    },
    definition: {
      en: "Freelancing means working for yourself and providing services to different clients rather than being an employee of one company.",
      mn: "Чөлөөт ажиллагаа гэдэг нь нэг компанийн ажилтан байхаас илүү өөртөө ажиллаж, өөр өөр үйлчлүүлэгчдэд үйлчилгээ үзүүлэхийг хэлнэ.",
      pt: "Trabalhar como freelancer significa trabalhar por conta própria e prestar serviços a diferentes clientes em vez de ser funcionário de uma empresa.",
    },
    plainLanguage: {
      en: "You are considered a business owner in the eyes of the tax office because you earn money by selling your skills or services directly to customers without a long-term employer.",
      mn: "Та урт хугацааны ажил олгогчгүйгээр ур чадвар, үйлчилгээгээ шууд худалдан авагчдад зарж мөнгө олдог тул татварын байгууллагын үзэл бодлоор бизнес эрхлэгч гэж тооцогддог.",
      pt: "Você é considerado dono de negócio perante a fazenda porque ganha dinheiro vendendo suas habilidades ou serviços diretamente aos clientes, sem um empregador de longa duração.",
    },
    whyItMatters: {
      en: "It determines how you report your income and allows you to deduct business-related expenses like home office costs or supplies to reduce your tax bill.",
      mn: "Та орлогоо хэрхэн тайлагнах, гэрээс ажиллах зардал эсвэл материал зэрэг бизнесийн зардлыг хасч татварын төлбөрөө бууруулах боломжийг тодорхойлно.",
      pt: "Determina como você declara sua renda e permite deduzir despesas relacionadas ao negócio, como home office ou materiais, para reduzir seu imposto.",
    },
    example: {
      en: "A graphic designer who completes projects for various local businesses and receives payments directly instead of a regular salary.",
      mn: "Тогтмол цалингийн оронд олон нийтийн бизнест төслүүд хийж, төлбөрөө шууд хүлээн авдаг график дизайнер.",
      pt: "Um designer gráfico que conclui projetos para vários negócios locais e recebe pagamentos diretamente em vez de salário fixo.",
    },
    actionTip: {
      en: "Report your total earnings and business-related costs in the self-employment section of your tax return and keep records for at least the required period.",
      mn: "Татварын тайлангаа өгөхдөө өөртөө ажиллагдлын хэсэгт нийт орлого болон бизнесийн зардлаа тайлагнаж, шаардлагатай хугацаанаас багагүй хугацаанд бүртгэл хадгална уу.",
      pt: "Declare seus ganhos totais e custos relacionados ao negócio na parte de trabalho autônomo da declaração e guarde os registros pelo menos pelo período exigido.",
    },
  },
];
