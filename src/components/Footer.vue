<template>
  <footer class="bg-primary border-t border-white/20 relative overflow-hidden text-white">
    <!-- 装饰元素 -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>
    <div class="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"></div>
    <div class="container mx-auto px-4 py-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- 公司信息 -->
        <div>
          <img src="/logo.png" alt="北京鸿驰祥瑞物流有限公司" class="w-auto h-16 object-contain mb-4 transition-transform duration-300 hover:scale-110" />
          <h2 class="text-white font-bold text-lg mb-2">北京鸿驰祥瑞物流有限公司</h2>
          <p class="text-white/90 mb-4">值得信赖的全球供应链合作伙伴</p>
          <div class="flex space-x-4 relative">
            <!-- 微信 -->
            <div class="relative group">
              <a href="#" class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:shadow-md">
                <img src="/微信.png" alt="微信" class="w-6 h-6 object-contain" />
              </a>
              <!-- 二维码 -->
              <div class="absolute top-[calc(100%+15px)] left-1/2 transform -translate-x-1/2 w-40 h-40 opacity-0 invisible transition-all duration-400 z-50 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2">
                <div class="bg-white p-2 rounded-lg shadow-lg w-full h-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-105">
                  <img src="/微信公众号.png" alt="微信二维码" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>
            
            <!-- QQ -->
            <div class="relative group">
              <a href="#" class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:shadow-md">
                <img src="/qq-1-1.svg" alt="QQ" class="w-6 h-6 object-contain" />
              </a>
              <!-- 二维码 -->
              <div class="absolute top-[calc(100%+15px)] left-1/2 transform -translate-x-1/2 w-40 h-40 opacity-0 invisible transition-all duration-400 z-50 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2">
                <div class="bg-white p-2 rounded-lg shadow-lg w-full h-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-105">
                  <img src="/QQ.png" alt="QQ二维码" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>
            
            <!-- 脸书 -->
            <div class="relative group">
              <a href="#" class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:shadow-md">
                <img src="/icon_facebook.png" alt="脸书" class="w-6 h-6 object-contain" />
              </a>
              <!-- 二维码 -->
              <div class="absolute top-[calc(100%+15px)] left-1/2 transform -translate-x-1/2 w-40 h-40 opacity-0 invisible transition-all duration-400 z-50 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2">
                <div class="bg-white p-2 rounded-lg shadow-lg w-full h-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-105">
                  <img src="/脸书.jpg" alt="脸书二维码" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>
            
            <!-- WhatsApp -->
            <div class="relative group">
              <a href="#" class="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:shadow-md">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <!-- 二维码 -->
              <div class="absolute top-[calc(100%+15px)] left-1/2 transform -translate-x-1/2 w-40 h-40 opacity-0 invisible transition-all duration-400 z-50 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2">
                <div class="bg-white p-2 rounded-lg shadow-lg w-full h-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-105">
                  <img src="/whatapp.png" alt="WhatsApp二维码" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 快速链接 -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-white relative inline-block">
            <span class="relative z-10">{{ t('footer.quickLinks') }}</span>
            <span class="absolute bottom-0 left-0 w-full h-2 bg-white/20 -z-10"></span>
          </h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-white/80 hover:text-white transition-all duration-300 transform hover:translate-x-1">{{ t('nav.home') }}</router-link></li>
            <li><router-link to="/services" class="text-white/80 hover:text-white transition-all duration-300 transform hover:translate-x-1">{{ t('nav.services') }}</router-link></li>
            <li><router-link to="/support" class="text-white/80 hover:text-white transition-all duration-300 transform hover:translate-x-1">{{ t('nav.support') }}</router-link></li>
            <li><router-link to="/about" class="text-white/80 hover:text-white transition-all duration-300 transform hover:translate-x-1">{{ t('nav.about') }}</router-link></li>
          </ul>
        </div>

        <!-- 联系我们 -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-white relative inline-block">
            <span class="relative z-10">{{ t('footer.contactUs') }}</span>
            <span class="absolute bottom-0 left-0 w-full h-2 bg-white/20 -z-10"></span>
          </h3>
          <ul class="space-y-3 text-white/80">
            <li class="flex items-start space-x-3 transition-all duration-300 hover:translate-x-1">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>张翔（David）</span>
            </li>
            <li class="flex items-start space-x-3 transition-all duration-300 hover:translate-x-1">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+8613911182428</span>
            </li>
            <li class="flex items-start space-x-3 transition-all duration-300 hover:translate-x-1">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>13911182428</span>
            </li>
            <li class="flex items-start space-x-3 transition-all duration-300 hover:translate-x-1">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>+8613911182428</span>
            </li>
            <li class="flex items-start space-x-3 transition-all duration-300 hover:translate-x-1">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>zhangxiang@hongchixiangrui.com</span>
            </li>
            <li class="flex items-start space-x-3 transition-all duration-300 hover:translate-x-1">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>北京市顺义区北高路99号25号楼一层130室</span>
            </li>
          </ul>
        </div>

        <!-- 二维码 -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-white relative inline-block">
            <span class="relative z-10">{{ t('footer.followUs') }}</span>
            <span class="absolute bottom-0 left-0 w-full h-2 bg-white/20 -z-10"></span>
          </h3>
          <div class="w-48 h-48 bg-white rounded-lg flex items-center justify-center border border-blue-200 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
            <img src="/微信公众号.png" alt="微信公众号" class="w-44 h-44 object-contain" />
          </div>
        </div>
      </div>

      <!-- 底部条款 -->
      <div class="border-t border-white/20 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-white/70 text-sm flex flex-wrap gap-4">
            <router-link to="/terms" class="hover:text-white transition-colors">{{ t('footer.terms') }}</router-link>
            <router-link to="/privacy" class="hover:text-white transition-colors">{{ t('footer.privacy') }}</router-link>
            <a href="#" class="hover:text-white transition-colors">{{ t('footer.serviceTerms') }}</a>
          </div>
          <div class="text-white/70 text-sm text-center md:text-right">
            <p>{{ t('footer.copyright') }}</p>
            <div class="mt-1 flex items-center justify-center md:justify-end space-x-4">
              <span>{{ t('footer.icp') }}</span>
              <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011302007815" class="flex items-center space-x-2 hover:text-white transition-colors">
                <img src="/gongan.png" alt="公安备案" class="w-4 h-4 object-contain" />
                <span>{{ t('footer.gongan') }}</span>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-4 text-white/70 text-sm text-center">
          <p>天津市极瞬网络科技提供本网站开发技术支持</p>
          <p class="mt-1">技术服务：13312084763</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
