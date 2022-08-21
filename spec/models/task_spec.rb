require 'rails_helper'

RSpec.describe Task, type: :model do
  it "可以建立task" do
    project = Project.create(title: "test",content: "test-content")

    task = project.tasks.create(title: "test",content: "test-content")

    expect(task.persisted?).to be true
  end

  it "task的title不能是空的" do
    project = Project.create(title: "test",content: "test-content")

    task = project.tasks.create(title: "",content: "test-content")

    expect(task.persisted?).to be false
  end
end
