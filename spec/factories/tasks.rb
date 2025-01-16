FactoryBot.define do
  factory :task do
    name { "New Task #{Time.current}" }
    project
  end
end
