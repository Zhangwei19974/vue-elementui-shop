<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avator_box">
        <img src="../assets/logo.png" alt="">
        
      </div>
      <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm" class="login_from">
        <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <!-- 登录 -->
          <el-form-item class ="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
          
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm:{
        username:"admin",
        password:"123456",
      },
      loginFormRules:{
        // 验证用户名
        username:[
          { required: true, message: '请输入登录名称', trgger:"blur"},
          { min:3, max:10, message: '长度在三到10位之间', trgger:"blur"}
        ],
        // 密码验证
        password:[
          { required: true, message: '请输入登录密码', trgger:"blur"},
          { min:6, max:15, message: '长度在6到15位之间', trgger:"blur"}
        ],
      }
    }
  },
  methods:{
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields();
    },
    login(){
      this.$refs.loginFormRef.validate(
        async (valid)=>{
          if(!valid) return;
          const {data:res} = await this.$http.post('login',this.loginForm);
          if(res.meta.status !== 200){
            return this.$message.error("登陆失败")
          }else{
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            window.sessionStorage.setItem('token',res.data.token);
            this.$router.push('/home')
          }
        }
      );
    }
  }
}
</script>

<style scoped>
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px  ;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .login_box .avator_box{
    position: absolute;
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
  }
  .login_box .avator_box img{
    height: inherit;
    width: inherit;
    border-radius: 50%;
    background-color: #eee;
  }
  .login_box .btns{
    display: flex;
    justify-content: flex-end;
  }
  .login_from{
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
  }
</style>