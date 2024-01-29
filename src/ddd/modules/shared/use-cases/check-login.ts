import { AuthRepository } from '@/ddd/modules/authentication/repositories/auth-repository'
import { AuthAggregator } from '@/ddd/modules/authentication/aggregators/auth-aggregator'
import { NotificationAggregator } from '@/ddd/modules/notification/aggregators/notification-aggregator'

export async function checkLogin(username: string, password: string): Promise<boolean> {
  const authRepository = new AuthRepository()
  const notificationAggregator = new NotificationAggregator()

  try {
    const response = await authRepository.login(username, password)
    if (response.data && response.status === 200) {
      const authAggregator = new AuthAggregator()
      authAggregator.setRole(response.data.role)
      authAggregator.setToken(response.data.token)
      authAggregator.setUsername(response.data.username)
      notificationAggregator.sendNotification({
        message: 'Logueado con suceso!',
        type: 'success'
      })
    } else {
      notificationAggregator.sendNotification({
        message: 'No es psible efectuar el login',
        type: 'danger'
      })
    }
    return response.status === 200 ? true : false
  } catch (err) {
    notificationAggregator.sendNotification({
      message: 'Email o password no corresponde',
      type: 'danger'
    })
    return false
  }
}
