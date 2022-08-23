FactoryBot.define do
  factory :task do
    project
    title { "MyString" }
    content { "MyText" }
  end
end
