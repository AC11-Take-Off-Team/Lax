require 'rails_helper'

RSpec.describe Task, type: :model do
  it "可以建立task" do
    task = create(:task)

    expect(task.persisted?).to be true
  end


  it "可以將user加到task裡面" do
    task = create(:task)
    user = create(:user)

    task.user_tasks.create(user_id: user.id)

    # p "-"*50
    # p UserTask.all
    # p "-"*50

    expect(UserTask.first.persisted?).to be true
  end
end
