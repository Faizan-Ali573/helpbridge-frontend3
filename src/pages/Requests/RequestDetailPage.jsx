import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as helpRequestService from '../../services/helpRequestService.js';
import * as messageService from '../../services/messageService.js';
import * as reviewService from '../../services/reviewService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';
import toast from 'react-hot-toast';

const RequestDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reqData, messagesData] = await Promise.all([
        helpRequestService.getHelpRequestById(id),
        messageService.getMessages(id),
      ]);
      setRequest(reqData);
      setMessages(messagesData || []);
    } catch (err) {
      // handled
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setSending(true);
    try {
      const msg = await messageService.sendMessage({
        requestId: id,
        text: messageText,
      });
      setMessages((prev) => [...prev, msg]);
      setMessageText('');
    } catch (err) {
      // handled
    } finally {
      setSending(false);
    }
  };

  const canReview =
    user?.role === 'USER' &&
    request?.status === 'COMPLETED' &&
    request?.volunteer &&
    !request.reviewed;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!request?.volunteer) return;
    setSubmittingReview(true);
    try {
      await reviewService.createReview({
        volunteerId: request.volunteer.id,
        requestId: request.id,
        rating: review.rating,
        comment: review.comment,
      });
      toast.success('Review submitted');
      setReview({ rating: 5, comment: '' });
    } catch (err) {
      // handled
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!request) return <p>Request not found.</p>;

  const expired = request.expiresAt && new Date(request.expiresAt) < new Date();

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            {request.title || request.category}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">{request.description}</p>
        </div>
        <div className="flex items-center gap-3">
          {request.status === 'PENDING' && request.userId === user?.id && (
            <button
              onClick={async () => {
                try {
                  await helpRequestService.triggerManualReminder(id);
                  toast.success('Reminder sent to matched volunteers');
                } catch (err) {
                  // handled
                }
              }}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-100 hover:bg-slate-700"
            >
              Remind matched volunteers
            </button>
          )}
          <StatusBadge status={request.status} expired={expired} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1.2fr]">
        <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60">
          <h3 className="text-sm font-semibold text-slate-100">Messages</h3>
          <div className="flex max-h-80 flex-col gap-2 overflow-y-auto rounded-xl bg-slate-950/70 p-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[80%] space-y-1 rounded-2xl bg-slate-800 px-3 py-2 text-xs sm:text-sm text-slate-50 shadow-sm">
                  <p>{msg.text}</p>
                  <span className="block text-[10px] text-slate-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-xs text-slate-400">No messages yet.</p>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-slate-100 outline-none ring-hb-primary/40 focus:border-hb-primary focus:ring-1"
            />
            <button
              type="submit"
              disabled={sending}
              className="rounded-lg bg-hb-primary px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-600 disabled:opacity-60"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </form>
        </section>

        <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60">
          <h3 className="text-sm font-semibold text-slate-100">Review</h3>
          {request.volunteer ? (
            <>
              <p className="text-xs sm:text-sm text-slate-300">
                Volunteer:{' '}
                <span className="font-semibold text-slate-50">
                  {request.volunteer.name}
                </span>
              </p>
              {canReview ? (
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Rating
                    </label>
                    <select
                      value={review.rating}
                      onChange={(e) =>
                        setReview((prev) => ({ ...prev, rating: Number(e.target.value) }))
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-slate-100 outline-none ring-hb-primary/40 focus:border-hb-primary focus:ring-1"
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Comment
                    </label>
                    <textarea
                      value={review.comment}
                      onChange={(e) =>
                        setReview((prev) => ({ ...prev, comment: e.target.value }))
                      }
                      className="min-h-[80px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-slate-100 outline-none ring-hb-primary/40 focus:border-hb-primary focus:ring-1"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="w-full rounded-lg bg-hb-secondary px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-60"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit review'}
                  </button>
                </form>
              ) : (
                <p className="text-xs sm:text-sm text-slate-400">
                  {request.status !== 'COMPLETED'
                    ? 'You can leave a review after the request is completed.'
                    : 'Review already submitted or not available.'}
                </p>
              )}
            </>
          ) : (
            <p className="text-xs sm:text-sm text-slate-400">No volunteer assigned yet.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default RequestDetailPage;


