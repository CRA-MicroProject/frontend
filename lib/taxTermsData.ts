import type { TaxTermRecord } from "@/lib/types";

export const TAX_TERMS: TaxTermRecord[] = [
  {
    id: "1",
    term: {
      en: "Income Tax",
      "mn-MN": "Орлогын татвар",
      "pt-BR": "Imposto de Renda",
    },
    definition: {
      en: "A tax levied on the annual income of individuals and businesses by the government.",
      "mn-MN": "Засаг захиргаанаас хувь хүн, байгууллагын жилийн орлогод ногдуулдаг татвар.",
      "pt-BR": "Imposto cobrado pelo governo sobre a renda anual de pessoas físicas e jurídicas.",
    },
    example: {
      en: "A salaried employee pays income tax on their wages; a freelancer pays it on their business profits.",
      "mn-MN": "Цалинтай ажилтан цалингаасаа орлогын татвар төлнө; бие даан ажиллагсад бизнесийн ашгаасаа төлнө.",
      "pt-BR": "Um assalariado paga imposto de renda sobre o salário; um freelancer paga sobre o lucro do negócio.",
    },
    actionTip: {
      en: "Keep records of all income and any allowable deductions so you can file accurately and on time.",
      "mn-MN": "Бүх орлого болон зөвшөөрөгдөх хөнгөлөлтийг бүртгэж байгаарай, ингэснээр үнэн зөв, цаг дуусахаас нь өмнө татвараа төлнө.",
      "pt-BR": "Mantenha registros de toda a renda e deduções permitidas para declarar com precisão e no prazo.",
    },
  },
  {
    id: "2",
    term: {
      en: "VAT",
      "mn-MN": "НӨАТ",
      "pt-BR": "IVA",
    },
    definition: {
      en: "Value Added Tax: a consumption tax placed on a product at each stage of the supply chain.",
      "mn-MN": "Нэмэгдсэн өртгийн албан татвар: бүтээгдэхүүний нийлүүлэлтийн үе бүрт ногдуулдаг хэрэглээний татвар.",
      "pt-BR": "Imposto sobre o Valor Agregado: imposto sobre consumo aplicado ao produto em cada etapa da cadeia de suprimentos.",
    },
    example: {
      en: "A café charges VAT on coffee; it pays VAT on the beans it buys and sends the difference to the tax office.",
      "mn-MN": "Кофе шөнийн газар кофены үнэнд НӨАТ нэмнэ; худалдаж авсан буудсын НӨАТ төлж, зөрүүг татварын байгууллагад илгээнэ.",
      "pt-BR": "Um café cobra IVA no café; paga IVA nos grãos que compra e envia a diferença à fazenda.",
    },
    actionTip: {
      en: "Check whether your turnover requires VAT registration and file returns by the deadline to avoid penalties.",
      "mn-MN": "Эргэлтийн хэмжээ НӨАТ-д бүртгүүлэхийг шаардаж байгаа эсэх, эцсийн хугацааг дутуулахгүй байж торгуульд орохоос сэргийл.",
      "pt-BR": "Verifique se seu faturamento exige registro de IVA e entregue as declarações no prazo para evitar multas.",
    },
  },
  {
    id: "3",
    term: {
      en: "Deduction",
      "mn-MN": "Хөнгөлөлт",
      "pt-BR": "Dedução",
    },
    definition: {
      en: "An amount subtracted from gross income when calculating taxable income.",
      "mn-MN": "Татварлагдах орлогыг тооцохдоо нийт орлогоос хасагдах дүн.",
      "pt-BR": "Valor subtraído da renda bruta no cálculo da renda tributável.",
    },
    example: {
      en: "A self-employed consultant deducts home office costs and travel to clients from their business income.",
      "mn-MN": "Өөртөө ажиллагсад зөвлөх нь гэрээс ажиллах зардал, үйлчлүүлэгч рүү явах зардлыг бизнесийн орлогоосоо хасдаг.",
      "pt-BR": "Um consultor autônomo deduz custos de home office e viagens a clientes da renda do negócio.",
    },
    actionTip: {
      en: "Keep receipts and records for every deduction you claim in case the tax authority asks for proof.",
      "mn-MN": "Татварын байгууллага нотлох баримт асуухад бэлтгэхийн тулд авах хөнгөлөлт бүрийн баримт, бүртгэл хадгална уу.",
      "pt-BR": "Guarde recibos e registros de cada dedução que reclamar caso a autoridade fiscal peça comprovação.",
    },
  },
  {
    id: "4",
    term: {
      en: "Taxable Income",
      "mn-MN": "Татвартай орлого",
      "pt-BR": "Renda Tributável",
    },
    definition: {
      en: "The portion of income used to calculate how much tax an individual or entity owes.",
      "mn-MN": "Хувь хүн эсвэл байгууллага хэдэн татвар төлөх ёстойг тооцоход ашигладаг орлогын хэсэг.",
      "pt-BR": "A parcela da renda usada para calcular quanto imposto um indivíduo ou entidade deve.",
    },
    example: {
      en: "If you earn $50,000 and have $10,000 in deductions, your taxable income is $40,000.",
      "mn-MN": "Хэрэв та 50,000 доллар олж, 10,000 долларын хөнгөлөлттэй бол татвартай орлого та 40,000 доллар.",
      "pt-BR": "Se você ganha R$ 50.000 e tem R$ 10.000 em deduções, sua renda tributável é R$ 40.000.",
    },
    actionTip: {
      en: "Review which income is taxable and which deductions apply to you before filing your return.",
      "mn-MN": "Татварын тайлангаа өгөхөөс өмнө аль орлого татвартай, ямар хөнгөлөлт танд хамааралтайг шалгана уу.",
      "pt-BR": "Revise qual renda é tributável e quais deduções se aplicam a você antes de declarar.",
    },
  },
  {
    id: "5",
    term: {
      en: "Withholding Tax",
      "mn-MN": "Суутгалтай татвар",
      "pt-BR": "Imposto na Fonte",
    },
    definition: {
      en: "Income tax withheld from wages or other payments and paid directly to the government.",
      "mn-MN": "Цалин эсвэл бусад төлбөрөөс урьдчилан суутгаж, засгийн газарт шууд төлөх орлогын татвар.",
      "pt-BR": "Imposto de renda retido dos salários ou outros pagamentos e pago diretamente ao governo.",
    },
    example: {
      en: "A company pays you $3,000; after withholding tax of $600 you receive $2,400. The $600 is sent to the tax office.",
      "mn-MN": "Компани танд 3,000 доллар төлнө; 600 долларын суутгалтай татварын дараа та 2,400 доллар хүлээн авна. 600 долларыг татварын байгууллагад илгээнэ.",
      "pt-BR": "Uma empresa paga R$ 3.000; após retenção de R$ 600 você recebe R$ 2.400. Os R$ 600 são enviados à fazenda.",
    },
    actionTip: {
      en: "Check your payslips to see how much was withheld. If you have other income, you may need to make extra payments during the year.",
      "mn-MN": "Хэдэн төгрөг суутгасныг харахын тулд цалингийн хуудсаа шалгана уу. Өөр орлого байвал жилийн турш нэмэлт төлбөр хийх шаардлагатай болж магадгүй.",
      "pt-BR": "Confira seus contracheques para ver quanto foi retido. Se tiver outra renda, pode precisar fazer pagamentos extras durante o ano.",
    },
  },
  {
    id: "6",
    term: {
      en: "Freelance",
      "mn-MN": "Чөлөөт ажилтан",
      "pt-BR": "Freelancer",
    },
    alsoKnownAs: {
      en: "Self-employment / Business Income",
      "mn-MN": "Өөртөө ажиллагаа / Бизнесийн орлого",
      "pt-BR": "Trabalho autônomo / Renda de negócio",
    },
    definition: {
      en: "Freelancing means working for yourself and providing services to different clients rather than being an employee of one company.",
      "mn-MN": "Чөлөөт ажиллагаа гэдэг нь нэг компанийн ажилтан байхаас илүү өөртөө ажиллаж, өөр өөр үйлчлүүлэгчдэд үйлчилгээ үзүүлэхийг хэлнэ.",
      "pt-BR": "Trabalhar como freelancer significa trabalhar por conta própria e prestar serviços a diferentes clientes em vez de ser funcionário de uma empresa.",
    },
    example: {
      en: "A graphic designer who completes projects for various local businesses and receives payments directly instead of a regular salary.",
      "mn-MN": "Тогтмол цалингийн оронд олон нийтийн бизнест төслүүд хийж, төлбөрөө шууд хүлээн авдаг график дизайнер.",
      "pt-BR": "Um designer gráfico que conclui projetos para vários negócios locais e recebe pagamentos diretamente em vez de salário fixo.",
    },
    actionTip: {
      en: "Report your total earnings and business-related costs in the self-employment section of your tax return and keep records for at least the required period.",
      "mn-MN": "Татварын тайлангаа өгөхдөө өөртөө ажиллагдлын хэсэгт нийт орлого болон бизнесийн зардлаа тайлагнаж, шаардлагатай хугацаанаас багагүй хугацаанд бүртгэл хадгална уу.",
      "pt-BR": "Declare seus ganhos totais e custos relacionados ao negócio na parte de trabalho autônomo da declaração e guarde os registros pelo menos pelo período exigido.",
    },
  },
];
