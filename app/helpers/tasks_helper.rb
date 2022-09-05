module TasksHelper
  def taipei_time(time)
    time&.localtime("+08:00")&.strftime('%m月%d日')
  end
  # 轉成台北時間
end
