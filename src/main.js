import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './style.css'
import { setI18nInstance } from './stores/language'

// 从localStorage读取保存的语言设置
const savedLanguage = localStorage.getItem('language') || 'zh'

// 多语言配置
const messages = {
  zh: {
    nav: {
      home: '首页',
      services: '服务与解决方案',
      support: '服务支持',
      news: '新闻资讯',
      knowledge: '知识中心',
      about: '关于我们',
      contact: '合作咨询',
      login: '登录',
      register: '注册'
    },
    header: {
      slogan: '客户为先 真诚利他 长期价值',
      phone: '联系电话：1391118248',
      sitemap: '网站地图',
      contactUs: '合作联系',
      companyName: '北京鸿驰祥瑞物流有限公司'
    },
    dropdown: {
      international: '国际进出口服务',
      airFreight: '国际空运',
      seaFreightLcl: '国际海运拼箱',
      seaFreightFcl: '国际海运整柜',
      chinaEuropeRailway: '中欧班列',
      chinaRussiaTir: '中俄TIR国际道路运输',
      centralAsiaTir: '中亚五国TIR国际道路运输',
      chinaEuropeTir: '中欧TIR国际道路运输',
      overseasWarehouse: '海外仓',
      multimodal: '多式联运',
      domestic: '中国境内业务',
      warehousing: '仓储服务',
      logisticsTransport: '物流运输（零担拼车、整车运输）',
      refrigeratedDangerous: '冷藏危险品运输',
      precisionInstruments: '精密仪器恒温气垫车运输',
      oversized: '超大件运输',
      valueAdded: '增值业务',
      customsClearance: '报关、清关、转关',
      loadingPackaging: '装卸、包装操作、包材',
      cargoInsurance: '货运保险、签回单',
      commodityInspection: '商检、产地证',
      consulting: '信息咨询、技术咨询、供应链咨询',
      smartSupplyChain: '供应链智能科技综合服务',
      customized: '客制化解决方案',
      customizedSolution: '客制化物流供应链综合解决方案',
      contactUs: '联系我们',
      quote: '报价单',
      newsInfo: '新闻资讯',
      serviceAnnouncements: '服务公告',
      placeOrder: '下单发货',
      logisticsTracking: '物流查询',
      cooperation: '合作咨询',
      techCooperation: '科技智能合作',
      techTransformation: '技术转型',
      logisticsKnowledge: '国际物流知识',
      tradeKnowledge: '国际贸易知识'
    },
    home: {
      whyChooseUs: '为什么选择我们',
      whyChooseUsDesc: '鸿驰祥瑞物流凭借多年行业经验，为您提供全方位的物流解决方案，确保货物安全、高效送达目的地。',
      coreServices: '核心服务',
      coreServicesDesc: '我们提供多种物流服务，满足不同客户的需求，从空运、海运到铁路和公路运输，应有尽有。',
      learnMore: '了解更多',
      advantages: {
        global: {
          title: '全球网络',
          desc: '覆盖全球200多个国家和地区的物流网络，为您提供一站式国际物流服务。'
        },
        efficient: {
          title: '高效快捷',
          desc: '先进的物流管理系统，确保货物快速通关和配送，提高供应链效率。'
        },
        safe: {
          title: '安全可靠',
          desc: '全程监控系统和专业团队，确保货物在运输过程中的安全和完好。'
        },
        cost: {
          title: '成本优化',
          desc: '根据货物特点和运输需求，为您定制最具性价比的物流方案。'
        }
      },
      services: {
        air: {
          title: '空运服务',
          desc: '提供全球空运服务，快速送达，适合时效性要求高的货物。'
        },
        sea: {
          title: '海运服务',
          desc: '经济实惠的海运解决方案，适合大批量货物的长途运输。'
        },
        rail: {
          title: '铁路运输',
          desc: '中欧班列等铁路运输服务，连接欧亚大陆，时效与成本兼顾。'
        },
        road: {
          title: '公路运输',
          desc: '覆盖全国的公路运输网络，提供灵活的门到门配送服务。'
        },
        warehouse: {
          title: '仓储服务',
          desc: '现代化仓储设施，提供存储、分拣、包装等一体化服务。'
        },
        multimodal: {
          title: '多式联运',
          desc: '整合多种运输方式，为您提供最优的综合物流解决方案。'
        }
      },
      statistics: {
        experience: '年行业经验',
        countries: '覆盖国家',
        clients: '合作客户',
        satisfaction: '客户满意度'
      },
      process: {
        title: '合作流程',
        desc: '简单几步，即可完成物流服务的预订和管理，让您的货物运输更加便捷。',
        steps: {
          consult: {
            title: '咨询需求',
            desc: '联系我们的客服团队，告知您的物流需求和具体要求。'
          },
          plan: {
            title: '制定方案',
            desc: '根据您的需求，我们为您定制最适合的物流解决方案。'
          },
          confirm: {
            title: '确认订单',
            desc: '确认物流方案和价格后，签订服务合同并安排运输。'
          },
          track: {
            title: '跟踪货物',
            desc: '通过我们的系统实时跟踪货物状态，掌握运输进度。'
          }
        }
      },
      cta: {
        title: '准备好开始您的物流之旅了吗？',
        desc: '无论您有任何物流需求，我们都能为您提供专业的解决方案。立即联系我们，获取免费报价。',
        consult: '立即咨询',
        call: '电话联系'
      }
    },
    footer: {
      quickLinks: '快速链接',
      contactUs: '联系我们',
      phone: '400-123-4567',
      email: 'info@hongchi-logistics.com',
      address: '北京市朝阳区建国路88号现代国际大厦',
      followUs: '关注我们',
      wechat: '微信公众号',
      terms: '服务条款',
      privacy: '隐私政策',
      serviceTerms: '服务协议',
      copyright: '© 2026 北京鸿驰祥瑞物流有限公司 版权所有',
      icp: '京ICP备2026006343号',
      gongan: '京公网安备11011302007815号'
    },
    quote: {
      title: '物流报价单',
      subtitle: '填写以下表单，获取专业的物流报价方案',
      formTitle: '获取报价',
      name: '联系人姓名',
      namePlaceholder: '请输入您的姓名',
      company: '公司名称',
      companyPlaceholder: '请输入公司名称',
      phone: '联系电话',
      phonePlaceholder: '请输入联系电话',
      email: '电子邮箱',
      emailPlaceholder: '请输入电子邮箱',
      cargoInfo: '货物信息',
      cargoType: '货物类型',
      cargoTypePlaceholder: '请选择货物类型',
      cargoTypeGeneral: '普通货物',
      cargoTypeDangerous: '危险品',
      cargoTypeRefrigerated: '冷藏品',
      cargoTypeOversized: '超大件',
      cargoTypeValuable: '贵重物品',
      weight: '货物重量',
      weightPlaceholder: '请输入货物重量',
      volume: '货物体积',
      volumePlaceholder: '请输入货物体积',
      pieces: '件数',
      piecesPlaceholder: '请输入货物件数',
      transportInfo: '运输信息',
      origin: '始发地',
      originPlaceholder: '请输入始发地',
      destination: '目的地',
      destinationPlaceholder: '请输入目的地',
      transportMode: '运输方式',
      transportModePlaceholder: '请选择运输方式',
      transportModeAir: '空运',
      transportModeSea: '海运',
      transportModeRail: '铁路',
      transportModeRoad: '公路',
      transportModeMultimodal: '多式联运',
      shipmentDate: '发货日期',
      otherInfo: '其他信息',
      otherInfoPlaceholder: '请输入其他特殊要求或说明',
      submit: '提交报价',
      submitting: '提交中...',
      submitSuccess: '报价请求提交成功！我们将尽快与您联系',
      submitError: '提交失败，请稍后重试',
      notice: '我们承诺保护您的隐私信息，仅用于物流报价用途',
      advantagesTitle: '为什么选择我们的报价服务',
      advantagesSubtitle: '专业、高效、透明的物流报价流程',
      advantageFast: '快速响应',
      advantageFastDesc: '24小时内给出专业报价方案，不耽误您的业务计划',
      advantageAccurate: '精准报价',
      advantageAccurateDesc: '根据货物特性和运输需求，提供最具性价比的物流方案',
      advantageProfessional: '专业服务',
      advantageProfessionalDesc: '15年行业经验，为您提供专业的物流咨询和解决方案'
    },
    userCenter: {
      title: '用户中心',
      subtitle: '欢迎回来，管理您的账户和物流服务',
      nav: {
        profile: '个人资料',
        orders: '订单管理',
        quotes: '报价管理',
        addresses: '地址管理',
        settings: '账号设置',
        logout: '退出登录'
      },
      profile: {
        title: '个人资料',
        name: '姓名',
        namePlaceholder: '请输入您的姓名',
        email: '电子邮箱',
        emailPlaceholder: '请输入您的电子邮箱',
        phone: '联系电话',
        phonePlaceholder: '请输入您的联系电话',
        company: '公司名称',
        companyPlaceholder: '请输入您的公司名称',
        address: '联系地址',
        addressPlaceholder: '请输入您的联系地址',
        update: '更新资料',
        updating: '更新中...',
        success: '个人资料更新成功！',
        error: '更新失败，请稍后重试'
      },
      orders: {
        title: '我的订单',
        orderId: '订单编号',
        date: '下单日期',
        status: '订单状态',
        amount: '订单金额',
        action: '操作',
        view: '查看',
        track: '追踪',
        empty: '暂无订单记录'
      },
      quotes: {
        title: '我的报价',
        date: '报价日期',
        origin: '始发地',
        destination: '目的地',
        view: '查看',
        contact: '联系我们',
        empty: '暂无报价记录'
      },
      addresses: {
        title: '地址管理',
        add: '添加地址',
        edit: '编辑',
        delete: '删除',
        default: '默认',
        empty: '暂无地址记录'
      },
      settings: {
        title: '账号设置',
        password: '密码修改',
        currentPassword: '当前密码',
        currentPasswordPlaceholder: '请输入当前密码',
        newPassword: '新密码',
        newPasswordPlaceholder: '请输入新密码',
        confirmPassword: '确认密码',
        confirmPasswordPlaceholder: '请再次输入新密码',
        updatePassword: '更新密码',
        updating: '更新中...',
        passwordSuccess: '密码修改成功！',
        passwordError: '密码修改失败，请稍后重试',
        passwordMismatch: '两次输入的密码不一致',
        notifications: '通知设置',
        emailNotifications: '邮件通知',
        smsNotifications: '短信通知',
        orderUpdates: '订单更新通知'
      }
    },
    news: {
      title: '新闻资讯',
      subtitle: '了解鸿驰祥瑞物流的最新动态和行业资讯',
      readMore: '阅读更多'
    },
    announcements: {
      title: '服务公告',
      subtitle: '及时了解服务调整和重要通知',
      important: '重要',
      empty: '暂无公告'
    },
    logisticsKnowledge: {
      title: '国际物流知识',
      subtitle: '掌握国际物流专业知识，助力业务发展',
      readMore: '阅读更多',
      empty: '暂无相关知识'
    },
    tradeKnowledge: {
      title: '国际贸易知识',
      subtitle: '了解国际贸易规则和实务，拓展全球市场',
      tips: '小贴士',
      empty: '暂无相关知识'
    },
    login: {
      title: '登录',
      subtitle: '欢迎使用智慧供应链系统',
      email: '电子邮箱',
      emailPlaceholder: '请输入电子邮箱',
      password: '密码',
      passwordPlaceholder: '请输入密码',
      remember: '记住我',
      forgotPassword: '忘记密码？',
      login: '登录',
      loggingIn: '登录中...',
      otherLoginMethods: '其他登录方式',
      wechatLogin: '微信登录',
      qqLogin: 'QQ登录',
      noAccount: '还没有账号？',
      registerNow: '立即注册'
    },
    register: {
      title: '注册',
      subtitle: '创建您的账户，开启物流之旅',
      company: '公司名称',
      companyPlaceholder: '请输入公司名称',
      name: '联系人姓名',
      namePlaceholder: '请输入联系人姓名',
      phone: '手机号码',
      phonePlaceholder: '请输入手机号码',
      code: '验证码',
      codePlaceholder: '请输入验证码',
      getCode: '获取验证码',
      countdown: '{countdown}秒',
      email: '电子邮箱',
      emailPlaceholder: '请输入电子邮箱',
      password: '设置密码',
      passwordPlaceholder: '请输入密码（至少6位）',
      confirmPassword: '确认密码',
      confirmPasswordPlaceholder: '请再次输入密码',
      agreeTerms: '我已阅读并同意',
      serviceTerms: '《服务条款》',
      privacyPolicy: '《隐私政策》',
      and: '和',
      register: '注册',
      registering: '注册中...',
      haveAccount: '已有账号？',
      loginNow: '立即登录'
    },
    about: {
      companyIntro: '公司简介',
      companyDesc1: '北京鸿驰祥瑞物流有限公司是一家专业的综合性物流服务企业，成立于2024年，总部位于北京。公司虽然年轻，但凭借专业的团队和创新的服务理念，迅速建立起覆盖全球的物流服务网络，致力于为客户提供安全、高效、可靠的一站式供应链解决方案。',
      companyDesc2: '公司主营业务涵盖国际空运、海运整柜/拼箱、中欧班列、国际道路运输、海外仓储、多式联运等多个领域。我们拥有一支经验丰富、专业高效的服务团队，能够根据客户的具体需求，量身定制最优的物流解决方案。',
      companyDesc3: '秉承"客户至上、服务为本"的经营理念，鸿驰祥瑞物流始终坚持以客户需求为导向，不断提升服务质量，优化业务流程，努力成为客户最值得信赖的物流合作伙伴。',
      companyCulture: '企业文化',
      vision: '企业愿景',
      visionDesc: '我们始终坚持做长期可持续有价值有意义的事业，实现合作共赢，成为全球合作伙伴最值得信赖的供应链综合解决方案提供商及合作伙伴',
      philosophy: '经营理念',
      philosophyDesc: '客户至上、服务为本',
      mission: '企业使命',
      missionDesc: '为客户提供安全、高效、可靠的一站式供应链解决方案，成为客户最值得信赖的物流合作伙伴',
      coreValues: '核心价值观',
      values1: '客户为先',
      values1Desc: '以客户需求为导向，提供优质服务',
      values2: '诚信经营',
      values2Desc: '诚实守信，合规经营',
      values3: '创新发展',
      values3Desc: '不断创新，追求卓越',
      values4: '合作共赢',
      values4Desc: '与客户、员工、合作伙伴共同成长',
      developmentHistory: '发展历程',
      history2024: '2024年',
      history2024Desc: '公司成立，总部位于北京',
      history2025: '2025年',
      history2025Desc: '业务拓展至欧洲、北美、东南亚等地区',
      history2026: '2026年',
      history2026Desc: '建立海外仓储网络，推出多式联运服务',
      future: '未来规划',
      futureDesc: '继续扩大全球服务网络，提升数字化服务能力，为客户提供更加智能、高效的物流解决方案',
      teamIntroduction: '团队介绍',
      teamDesc: '我们拥有一支经验丰富、专业高效的服务团队，致力于为客户提供最优质的物流服务',
      leader: '管理团队',
      leaderDesc: '由行业资深专家组成，拥有丰富的物流管理经验',
      staff: '专业团队',
      staffDesc: '具备专业知识和技能，为客户提供个性化服务',
      partner: '合作伙伴',
      partnerDesc: '与全球知名物流企业建立长期稳定的合作关系'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services & Solutions',
      support: 'Support',
      news: 'News',
      knowledge: 'Knowledge Center',
      about: 'About Us',
      contact: 'Contact',
      login: 'Login',
      register: 'Register'
    },
    header: {
      slogan: 'Customer First, Sincere Altruism, Long-term Value',
      phone: 'Phone: 1391118248',
      sitemap: 'Site Map',
      contactUs: 'Contact Us',
      companyName: 'Beijing Hongchi Xiangrui Logistics Co., Ltd.'
    },
    dropdown: {
      international: 'International Import & Export Services',
      airFreight: 'International Air Freight',
      seaFreightLcl: 'International Sea Freight LCL',
      seaFreightFcl: 'International Sea Freight FCL',
      chinaEuropeRailway: 'China-Europe Railway Express',
      chinaRussiaTir: 'China-Russia TIR International Road Transport',
      centralAsiaTir: 'Central Asia TIR International Road Transport',
      chinaEuropeTir: 'China-Europe TIR International Road Transport',
      overseasWarehouse: 'Overseas Warehouse',
      multimodal: 'Multimodal Transportation',
      domestic: 'Domestic Business',
      warehousing: 'Warehousing Services',
      logisticsTransport: 'Logistics Transport (Less than Truckload, Full Truckload)',
      refrigeratedDangerous: 'Refrigerated Dangerous Goods Transport',
      precisionInstruments: 'Precision Instruments Temperature-Controlled Air Cushion Truck Transport',
      oversized: 'Oversized Cargo Transport',
      valueAdded: 'Value-Added Services',
      customsClearance: 'Customs Declaration, Clearance, Transit',
      loadingPackaging: 'Loading, Packaging Operations, Packaging Materials',
      cargoInsurance: 'Cargo Insurance, Receipt Return',
      commodityInspection: 'Commodity Inspection, Certificate of Origin',
      consulting: 'Information Consulting, Technical Consulting, Supply Chain Consulting',
      smartSupplyChain: 'Smart Supply Chain Technology Integrated Services',
      customized: 'Customized Solutions',
      customizedSolution: 'Customized Logistics Supply Chain Integrated Solution',
      contactUs: 'Contact Us',
      quote: 'Quote',
      newsInfo: 'News',
      serviceAnnouncements: 'Service Announcements',
      placeOrder: 'Place Order',
      logisticsTracking: 'Logistics Tracking',
      cooperation: 'Cooperation Consulting',
      techCooperation: 'Technology Smart Cooperation',
      techTransformation: 'Technical Transformation',
      logisticsKnowledge: 'International Logistics Knowledge',
      tradeKnowledge: 'International Trade Knowledge'
    },
    home: {
      whyChooseUs: 'Why Choose Us',
      whyChooseUsDesc: 'With years of industry experience, Hongchi Xiangrui Logistics provides comprehensive logistics solutions to ensure safe and efficient delivery of goods to their destinations.',
      coreServices: 'Core Services',
      coreServicesDesc: 'We offer a variety of logistics services to meet different customer needs, from air, sea to rail and road transportation, everything you need.',
      learnMore: 'Learn More',
      advantages: {
        global: {
          title: 'Global Network',
          desc: 'Logistics network covering more than 200 countries and regions worldwide, providing one-stop international logistics services for you.'
        },
        efficient: {
          title: 'Efficient and Fast',
          desc: 'Advanced logistics management system to ensure fast customs clearance and delivery, improving supply chain efficiency.'
        },
        safe: {
          title: 'Safe and Reliable',
          desc: 'Full monitoring system and professional team to ensure the safety and integrity of goods during transportation.'
        },
        cost: {
          title: 'Cost Optimization',
          desc: 'Customize the most cost-effective logistics solution for you based on cargo characteristics and transportation needs.'
        }
      },
      services: {
        air: {
          title: 'Air Freight',
          desc: 'Provide global air freight services, fast delivery, suitable for goods with high timeliness requirements.'
        },
        sea: {
          title: 'Sea Freight',
          desc: 'Economical sea freight solutions, suitable for long-distance transportation of large quantities of goods.'
        },
        rail: {
          title: 'Rail Transportation',
          desc: 'China-Europe Railway Express and other rail transportation services, connecting Eurasia, balancing time efficiency and cost.'
        },
        road: {
          title: 'Road Transportation',
          desc: 'National road transportation network, providing flexible door-to-door delivery services.'
        },
        warehouse: {
          title: 'Warehousing Services',
          desc: 'Modern warehousing facilities, providing integrated services such as storage, sorting, and packaging.'
        },
        multimodal: {
          title: 'Multimodal Transportation',
          desc: 'Integrate multiple transportation modes to provide you with the optimal comprehensive logistics solution.'
        }
      },
      statistics: {
        experience: 'Years of Industry Experience',
        countries: 'Covered Countries',
        clients: 'Cooperating Clients',
        satisfaction: 'Customer Satisfaction'
      },
      process: {
        title: 'Cooperation Process',
        desc: 'With just a few simple steps, you can complete the booking and management of logistics services, making your cargo transportation more convenient.',
        steps: {
          consult: {
            title: 'Consultation',
            desc: 'Contact our customer service team to inform us of your logistics needs and specific requirements.'
          },
          plan: {
            title: 'Solution Design',
            desc: 'Based on your needs, we customize the most suitable logistics solution for you.'
          },
          confirm: {
            title: 'Order Confirmation',
            desc: 'After confirming the logistics plan and price, sign the service contract and arrange transportation.'
          },
          track: {
            title: 'Cargo Tracking',
            desc: 'Real-time tracking of cargo status through our system,掌握 transportation progress.'
          }
        }
      },
      cta: {
        title: 'Ready to Start Your Logistics Journey?',
        desc: 'No matter what logistics needs you have, we can provide you with professional solutions. Contact us now for a free quote.',
        consult: 'Consult Now',
        call: 'Call Us'
      }
    },
    footer: {
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      phone: '400-123-4567',
      email: 'info@hongchi-logistics.com',
      address: 'Modern International Building, 88 Jianguo Road, Chaoyang District, Beijing',
      followUs: 'Follow Us',
      wechat: 'WeChat Official Account',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      serviceTerms: 'Service Agreement',
      copyright: '© 2026 Beijing Hongchi Xiangrui Logistics Co., Ltd. All Rights Reserved',
      icp: 'Beijing ICP No. 2026006343',
      gongan: 'Beijing Public Network Security No. 11011302007815'
    },
    quote: {
      title: 'Logistics Quote',
      subtitle: 'Fill in the following form to get a professional logistics quote',
      formTitle: 'Get Quote',
      name: 'Contact Name',
      namePlaceholder: 'Please enter your name',
      company: 'Company Name',
      companyPlaceholder: 'Please enter company name',
      phone: 'Contact Phone',
      phonePlaceholder: 'Please enter contact phone',
      email: 'Email',
      emailPlaceholder: 'Please enter email',
      cargoInfo: 'Cargo Information',
      cargoType: 'Cargo Type',
      cargoTypePlaceholder: 'Please select cargo type',
      cargoTypeGeneral: 'General Cargo',
      cargoTypeDangerous: 'Dangerous Goods',
      cargoTypeRefrigerated: 'Refrigerated Goods',
      cargoTypeOversized: 'Oversized Cargo',
      cargoTypeValuable: 'Valuable Goods',
      weight: 'Cargo Weight',
      weightPlaceholder: 'Please enter cargo weight',
      volume: 'Cargo Volume',
      volumePlaceholder: 'Please enter cargo volume',
      pieces: 'Number of Pieces',
      piecesPlaceholder: 'Please enter number of pieces',
      transportInfo: 'Transportation Information',
      origin: 'Origin',
      originPlaceholder: 'Please enter origin',
      destination: 'Destination',
      destinationPlaceholder: 'Please enter destination',
      transportMode: 'Transportation Mode',
      transportModePlaceholder: 'Please select transportation mode',
      transportModeAir: 'Air Freight',
      transportModeSea: 'Sea Freight',
      transportModeRail: 'Rail Transportation',
      transportModeRoad: 'Road Transportation',
      transportModeMultimodal: 'Multimodal Transportation',
      shipmentDate: 'Shipment Date',
      otherInfo: 'Other Information',
      otherInfoPlaceholder: 'Please enter other special requirements or instructions',
      submit: 'Submit Quote',
      submitting: 'Submitting...',
      submitSuccess: 'Quote request submitted successfully! We will contact you as soon as possible',
      submitError: 'Submission failed, please try again later',
      notice: 'We promise to protect your privacy information, only for logistics quote purposes',
      advantagesTitle: 'Why Choose Our Quote Service',
      advantagesSubtitle: 'Professional, efficient, transparent logistics quote process',
      advantageFast: 'Fast Response',
      advantageFastDesc: 'Provide professional quote solutions within 24 hours, without delaying your business plans',
      advantageAccurate: 'Accurate Quote',
      advantageAccurateDesc: 'Provide the most cost-effective logistics solution based on cargo characteristics and transportation needs',
      advantageProfessional: 'Professional Service',
      advantageProfessionalDesc: '15 years of industry experience, providing you with professional logistics consultation and solutions'
    },
    userCenter: {
      title: 'User Center',
      subtitle: 'Welcome back, manage your account and logistics services',
      nav: {
        profile: 'Personal Information',
        orders: 'Order Management',
        quotes: 'Quote Management',
        addresses: 'Address Management',
        settings: 'Account Settings',
        logout: 'Logout'
      },
      profile: {
        title: 'Personal Information',
        name: 'Name',
        namePlaceholder: 'Please enter your name',
        email: 'Email',
        emailPlaceholder: 'Please enter your email',
        phone: 'Phone',
        phonePlaceholder: 'Please enter your phone',
        company: 'Company Name',
        companyPlaceholder: 'Please enter your company name',
        address: 'Address',
        addressPlaceholder: 'Please enter your address',
        update: 'Update Information',
        updating: 'Updating...',
        success: 'Personal information updated successfully!',
        error: 'Update failed, please try again later'
      },
      orders: {
        title: 'My Orders',
        orderId: 'Order ID',
        date: 'Order Date',
        status: 'Order Status',
        amount: 'Order Amount',
        action: 'Action',
        view: 'View',
        track: 'Track',
        empty: 'No order records'
      },
      quotes: {
        title: 'My Quotes',
        date: 'Quote Date',
        origin: 'Origin',
        destination: 'Destination',
        view: 'View',
        contact: 'Contact Us',
        empty: 'No quote records'
      },
      addresses: {
        title: 'Address Management',
        add: 'Add Address',
        edit: 'Edit',
        delete: 'Delete',
        default: 'Default',
        empty: 'No address records'
      },
      settings: {
        title: 'Account Settings',
        password: 'Password Change',
        currentPassword: 'Current Password',
        currentPasswordPlaceholder: 'Please enter current password',
        newPassword: 'New Password',
        newPasswordPlaceholder: 'Please enter new password',
        confirmPassword: 'Confirm Password',
        confirmPasswordPlaceholder: 'Please re-enter new password',
        updatePassword: 'Update Password',
        updating: 'Updating...',
        passwordSuccess: 'Password changed successfully!',
        passwordError: 'Password change failed, please try again later',
        passwordMismatch: 'The two passwords do not match',
        notifications: 'Notification Settings',
        emailNotifications: 'Email Notifications',
        smsNotifications: 'SMS Notifications',
        orderUpdates: 'Order Update Notifications'
      }
    },
    news: {
      title: 'News',
      subtitle: 'Learn about the latest developments of Hongchi Xiangrui Logistics and industry news',
      readMore: 'Read More'
    },
    announcements: {
      title: 'Service Announcements',
      subtitle: 'Stay informed about service adjustments and important notices',
      important: 'Important',
      empty: 'No announcements'
    },
    logisticsKnowledge: {
      title: 'International Logistics Knowledge',
      subtitle: 'Master international logistics professional knowledge,助力 business development',
      readMore: 'Read More',
      empty: 'No relevant knowledge'
    },
    tradeKnowledge: {
      title: 'International Trade Knowledge',
      subtitle: 'Understand international trade rules and practices, expand global markets',
      tips: 'Tips',
      empty: 'No relevant knowledge'
    },
    login: {
      title: 'Login',
      subtitle: 'Welcome to Smart Supply Chain System',
      email: 'Email',
      emailPlaceholder: 'Please enter your email',
      password: 'Password',
      passwordPlaceholder: 'Please enter your password',
      remember: 'Remember me',
      forgotPassword: 'Forgot password?',
      login: 'Login',
      loggingIn: 'Logging in...',
      otherLoginMethods: 'Other login methods',
      wechatLogin: 'WeChat Login',
      qqLogin: 'QQ Login',
      noAccount: 'Don\'t have an account?',
      registerNow: 'Register Now'
    },
    register: {
      title: 'Register',
      subtitle: 'Create your account, start your logistics journey',
      company: 'Company Name',
      companyPlaceholder: 'Please enter company name',
      name: 'Contact Name',
      namePlaceholder: 'Please enter contact name',
      phone: 'Phone Number',
      phonePlaceholder: 'Please enter phone number',
      code: 'Verification Code',
      codePlaceholder: 'Please enter verification code',
      getCode: 'Get Code',
      countdown: '{countdown}s',
      email: 'Email',
      emailPlaceholder: 'Please enter email',
      password: 'Set Password',
      passwordPlaceholder: 'Please enter password (at least 6 characters)',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Please re-enter password',
      agreeTerms: 'I have read and agree to the',
      serviceTerms: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      and: 'and',
      register: 'Register',
      registering: 'Registering...',
      haveAccount: 'Already have an account?',
      loginNow: 'Login Now'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services et Solutions',
      support: 'Support',
      about: 'À Propos',
      contact: 'Contact',
      login: 'Connexion',
      register: 'S\'inscrire'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: 'zh',
  messages
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

setI18nInstance(i18n)

app.mount('#app')
